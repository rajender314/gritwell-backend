import { GetLifeStyles } from '@basePath/Admin/Commands/GetLifeStyles';
import { GetLifeStyle } from '@basePath/Admin/Commands/GetLifeStyle';
import { CreateLifeStyle } from '@basePath/Admin/Commands/CreateLifeStyle';
import { UpdateLifeStyle } from '@basePath/Admin/Commands/UpdateLifeStyle';
import { DeleteLifeStyle } from '@basePath/Admin/Commands/DeleteLifeStyle';
import { Recommendations } from '@basePath/Admin/Commands/Recommendations';
import { LifeStyleSchema }
  from '@basePath/Admin/DataSource/Models/Schema/LifeStyleSchema';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
/**
 * class LifeStyleDataSource
 */
export default class LifeStyleDataSource {
  /**
     * create
     * @param {data} data CreateLifeStyle
     * @return {Object} newly created LifeStyle
     */
  async create(data: CreateLifeStyle) {
    try {
      const totalLifestyles = await LifeStyleSchema.countDocuments();
      const uuid = `LFT${totalLifestyles + 1}`;
      await LifeStyleSchema.create({
        'name': data.name,
        'description': data.description,
        'uuid': uuid,
        'status': data.status,
        'created_by': data.created_by,
        'created_date': data.created_date,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      });
      return 'Lifestyle added successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetLifeStyle Command
     * @return {Object} newly single Diagnosis based on Id
     */
  async view(data: GetLifeStyle) {
    try {
      return await LifeStyleSchema.findById(data.id);
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }


  /**
     *
     * @param {data} data UpdateLifeStyle
     * @return {Object} updated Lifestyle Information
     */
  async update(data: UpdateLifeStyle) {
    try {
      const updateData = {
        'name': data.name,
        'description': data.description,
        'status': data.status,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      };
      await LifeStyleSchema
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .then((lifestyle) => lifestyle)
        .catch((error: any) => {
          return error;
        });
      return 'Lifestyle updated successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data DeleteLifeStyle
     * @return {Object} null
     */
  async delete(data: DeleteLifeStyle) {
    try {
      if (data.ids) {
        return LifeStyleSchema.updateMany(
          { _id: { $in: data.ids } },
          { $set: { is_deleted: true, status: false, deleted_at: Date.now() } },
          { multi: true },
        );
      }
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetLifeStyles
     * @return {Object} all LifeStyles
     */
  async get(data: GetLifeStyles) {
    if (data.type === 'health_plan') {
      data.perPage = await LifeStyleSchema.find({ status: true }).countDocuments({});
    }
    const lifeStyleCommand = new Recommendations({
      query: data,
      schema: LifeStyleSchema,
      'collectionName': 'LifeStyle'
    });
    return await new CommandFactory().getCommand(
      lifeStyleCommand.path,
      true,
      lifeStyleCommand,
    );
  }
}
