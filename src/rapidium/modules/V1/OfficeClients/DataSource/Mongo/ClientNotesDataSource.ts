import { ClientNotes } from '@basePath/OfficeClients/Commands/ClientNotes';
import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import { CreateClientNotes }
  from '@basePath/OfficeClients/Commands/CreateClientNotes';
import { NotesSchema }
  from '@basePath/OfficeClients/DataSource/Models/Schema/NotesSchema';
import { ClientNotesSchema }
  from '@basePath/OfficeClients/DataSource/Models/Schema/ClientNotesSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

import {
  IClientNotes,
  IClientNotesData,
  IClientNotesArr,
} from '@basePath/OfficeClients/Interfaces/IClientNotes';
/**
 * class ClientNotesDataSource
 */
export default class ClientNotesDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async getNotes(data: ClientNotes) {
    try {
      const clientNotesData: Array<IClientNotes> = [];
      // Verify Client
      await this.verifyClient(data.client_id);

      // Get Notes based on Client id
      const clientNotes = await this.clientNotes(data.client_id);

      return await NotesSchema.find({ status: true }).then((notes) => {
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
   * @return {Object} created or updated client note
   */
  async createNotes(data: CreateClientNotes) {
    // Verify Client
    await this.verifyClient(data.client_id);

    // Verify Note
    await this.verifyNote(data.note_id);
    const clientsNote = await ClientNotesSchema.findOne({
      client_id: data.client_id,
      note_id: data.note_id,
    });
    if (clientsNote != null) {
      return await ClientNotesSchema.findByIdAndUpdate(
        clientsNote._id,
        {
          description: data.description,
          last_modified_by: data.last_modified_by,
          last_modified_date: data.last_modified_date,
        },
        { new: true },
      );
    } else {
      const note = await NotesSchema.findOne({
        _id: data.note_id,
        status: true,
      });
      if (note != null) {
        return await ClientNotesSchema.create({
          client_id: data.client_id,
          note_id: data.note_id,
          note_name: note.name,
          note_label: note.label,
          description: data.description,
          created_by: data.created_by,
          last_modified_by: data.last_modified_by,
          created_date: data.created_date,
          last_modified_date: data.last_modified_date,
        });
      }
    }
  }

  /**
   * @param {clientId} clientId
   * @return {Object} get client notes based on client id
   */
  async clientNotes(clientId: ClientNotes['client_id']) {
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
    ]).then((clientNote: IClientNotesData[]) => {
      const clientNotesArr: IClientNotesArr = {};
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
   * Verify Client based on client Id
   * @param {clientId} clientId
   */
  async verifyClient(
    clientId: ClientNotes['client_id'] | CreateClientNotes['client_id'],
  ) {
    const verifyClient = await UserSchema.find({
      _id: clientId,
      status: true,
    }).countDocuments();
    if (verifyClient === 0) {
      throw new ResourceNotFound('Client Not Available', '');
    }
  }

  /**
   * Verify Note based on note Id
   * @param {noteId} noteId
   */
  async verifyNote(noteId: CreateClientNotes['note_id']) {
    const verifyNote = await NotesSchema.find({
      _id: noteId,
      status: true,
    }).countDocuments();
    if (verifyNote === 0) {
      throw new ResourceNotFound('Note Not Available', '');
    }
  }
}
