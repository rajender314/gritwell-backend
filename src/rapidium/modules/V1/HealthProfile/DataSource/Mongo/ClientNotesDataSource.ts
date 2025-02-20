import { GetClientNotes }
  from '@basePath/HealthProfile/Commands/GetClientNotes';
import { CreateClientNotes }
  from '@basePath/HealthProfile/Commands/CreateClientNotes';
import { NotesSchema }
  from '@basePath/OfficeClients/DataSource/Models/Schema/NotesSchema';
import { ClientNotesSchema }
  from '@basePath/OfficeClients/DataSource/Models/Schema/ClientNotesSchema';
import { ValidateClient }
  from
  '@basePath/OfficeClients/DataSource/Mongo/ValidateClient';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

/**
* class ClientNotesDataSource
*/
export default class ClientNotesDataSource {

  /**
   * @param {data} data GetClientNotes
   * @return {Object}
   */
  async get(data: GetClientNotes) {
    try {
      const clientNotesData: any = [];
      const clientNotes = await this.clientNotes(data.client_id);
      return await NotesSchema.find({ status: true, type: data.type }).then((notes) => {
        if (notes.length) {
          notes.map((note) => {
            let description: string = '';
            let lastModifiedDate: string = '';
            let lastModifiedBy: string = '';
            let name: string = '';
            let label: string = '';
            if (clientNotes[note._id]) {
              name =
                clientNotes[note._id] &&
                  clientNotes[note._id].note_name ?
                  clientNotes[note._id].note_name :
                  '';
              label =
                clientNotes[note._id] &&
                  clientNotes[note._id].note_label ?
                  clientNotes[note._id].note_label :
                  '';
              description =
                clientNotes[note._id] &&
                  clientNotes[note._id].description ?
                  clientNotes[note._id].description :
                  '';
              lastModifiedDate =
                clientNotes[note._id] &&
                  clientNotes[note._id].last_modified_date ?
                  clientNotes[note._id].last_modified_date :
                  '';
              lastModifiedBy =
                clientNotes[note._id] &&
                  clientNotes[note._id].last_modified_by ?
                  clientNotes[note._id].last_modified_by :
                  '';
            } else {
              name = note.name;
              label = note.label;
            }

            clientNotesData.push({
              note_id: note._id,
              note_name: name,
              note_label: label,
              description,
              last_modified_date: lastModifiedDate,
              last_modified_by: lastModifiedBy,
            });
          });
          return clientNotesData;
        }
      });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
 * @param {data} data CreateClientNotes
 * @return {Object} created or update client note
 */
  async create(data: CreateClientNotes) {
    //Validate Client
    await new ValidateClient(data.client_id).validate();
    if (data.notes.length) {
      await this.createOrUpdateNotes(data.notes, async (note) => {
        //Validate Note
        await this.verifyNote(note.note_id);
        const clientsNote = await ClientNotesSchema.findOne({
          client_id: data.client_id,
          note_id: note.note_id,
        });
        if (clientsNote != null) {
          return await ClientNotesSchema.findByIdAndUpdate(
            clientsNote._id,
            {
              description: note.description,
              last_modified_by: data.last_modified_by,
              last_modified_date: data.last_modified_date,
            },
            { new: true },
          );
        } else {
          const dbNote = await NotesSchema.findOne({
            _id: note.note_id,
            status: true,
          });
          if (dbNote != null) {
            return await ClientNotesSchema.create({
              client_id: data.client_id,
              note_id: dbNote._id,
              note_name: dbNote.name,
              note_label: dbNote.label,
              description: note.description,
              created_by: data.created_by,
              last_modified_by: data.last_modified_by,
              created_date: data.created_date,
              last_modified_date: data.last_modified_date,
            });
          }
        }
      });
    }
    return true;
  }

  createOrUpdateNotes = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  /**
* @param {clientId} clientId
* @return {Object} get client notes based on client id
*/
  async clientNotes(clientId: string) {
    return await ClientNotesSchema.aggregate([
      { $match: { client_id: ObjectId(clientId) } },
      {
        $lookup: {
          from: 'office_users',
          localField: 'last_modified_by',
          foreignField: 'user_id',
          as: 'last_modified_by',
        },
      },
      {
        $unwind: {
          path: '$last_modified_by',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]).then((clientNote: any) => {
      const clientNotesArr: any = {};
      if (clientNote.length) {
        clientNote.map((client) => {
          clientNotesArr[client.note_id.toString()] = {
            description: client.description,
            note_id: client.note_id,
            note_name: client.note_name,
            note_label: client.note_label,
            last_modified_by:
              `${client.last_modified_by.first_name} ${client.last_modified_by.last_name}`,
            last_modified_date: client.last_modified_date,
          };
        });
      }
      return clientNotesArr;
    });
  }

  /**
    * Verify Note based on note Id
    * @param {noteId} noteId
    */
  async verifyNote(noteId: string) {
    const verifyNote = await NotesSchema.find({
      _id: noteId,
      status: true,
    }).countDocuments();
    if (verifyNote === 0) {
      throw new ResourceNotFound('note_id is invalid', '');
    }
  }
}
