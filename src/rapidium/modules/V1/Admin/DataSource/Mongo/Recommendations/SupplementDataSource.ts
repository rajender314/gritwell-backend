import { GetSupplement } from '@basePath/Admin/Commands/GetSupplement';
import { GetSupplements } from '@basePath/Admin/Commands/GetSupplements';
import { CreateSupplement } from '@basePath/Admin/Commands/CreateSupplement';
import { UpdateSupplement } from '@basePath/Admin/Commands/UpdateSupplement';
import { DeleteSupplement } from '@basePath/Admin/Commands/DeleteSupplement';
import { SupplementSchema }
  from '@basePath/Admin/DataSource/Models/Schema/SupplementSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { Recommendations } from '@basePath/Admin/Commands/Recommendations';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
/**
 * class SupplementDataSource
 */
export default class SupplementDataSource {
  /**
     * create
     * @param {data} data CreateSupplement Command
     * @return {Object} newly created Supplement
     */
  async create(data: CreateSupplement) {
    try {
      const totalSupplements = await SupplementSchema.countDocuments();
      const uuid = `SUP${totalSupplements + 1}`;
      await SupplementSchema.create({
        'name': data.name,
        'description': data.description,
        'brand': data.brand,
        'dosage': data.dosage,
        'price': data.price,
        'link': data.link,
        'uuid': uuid,
        'status': data.status,
        'created_by': data.created_by,
        'created_date': data.created_date,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      });
      return 'Supplement added successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }


  /**
     *
     * @param {data} data GetSupplement Command
     * @return {Object} newly single supplement based on Id
     */
  async view(data: GetSupplement) {
    try {
      return await SupplementSchema.findById(data.id);
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     * update
     * @param {data} data UpdateSupplement
     * @return {Object} updated supplement
     */
  async update(data: UpdateSupplement) {
    try {
      const updateData = {
        'name': data.name,
        'description': data.description,
        'status': data.status,
        'brand': data.brand,
        'dosage': data.dosage,
        'price': data.price,
        'link': data.link,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      };
      await SupplementSchema
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .then((supplement) => supplement)
        .catch((error: any) => {
          return error;
        });
      return 'Supplement updated successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     * delete
     * @param {data} data DeleteSupplement
     * @return {Object}
     */
  async delete(data: DeleteSupplement) {
    try {
      if (data.ids) {
        return SupplementSchema.updateMany(
          { _id: { $in: data.ids } },
          { $set: { is_deleted: true, deleted_at: Date.now() } },
          { multi: true },
        );
      }
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
 * get
 * @param {data} data
 * @return {Object}
 */
  async get(data: GetSupplements) {
    try {
      if (data.type === 'health_plan') {
        data.perPage = await SupplementSchema.find({ status: true }).countDocuments({});
      }
      const supplementCommand = new Recommendations({
        query: data,
        schema: SupplementSchema,
        'collectionName': 'Supplement'
      });
      return await new CommandFactory().getCommand(
        supplementCommand.path,
        true,
        supplementCommand,
      );
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
