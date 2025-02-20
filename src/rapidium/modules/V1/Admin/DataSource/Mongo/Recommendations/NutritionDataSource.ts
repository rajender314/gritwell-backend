import { GetNutrition } from '@basePath/Admin/Commands/GetNutrition';
import { GetNutritions } from '@basePath/Admin/Commands/GetNutritions';
import { CreateNutrition } from '@basePath/Admin/Commands/CreateNutrition';
import { UpdateNutrition } from '@basePath/Admin/Commands/UpdateNutrition';
import { DeleteNutrition } from '@basePath/Admin/Commands/DeleteNutrition';
import { Recommendations } from '@basePath/Admin/Commands/Recommendations';
import { NutritionSchema }
  from '@basePath/Admin/DataSource/Models/Schema/NutritionSchema';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
/**
 * class NutritionDataSource
 */
export default class NutritionDataSource {
  /**
   *
   * @param {data} data CreateNutrition Command
   * @return {Object} newly created Nutrition
   */
  async create(data: CreateNutrition) {
    try {
      const totalNutritions = await NutritionSchema.countDocuments();
      const uuid = `NTR${totalNutritions + 1}`;
      await NutritionSchema.create({
        'name': data.name,
        'description': data.description,
        'uuid': uuid,
        'status': data.status,
        'created_by': data.created_by,
        'created_date': data.created_date,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      });
      return 'Nutrition added successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetNutrition Command
     * @return {Object} newly single Diagnosis based on Id
     */
  async view(data: GetNutrition) {
    try {
      return await NutritionSchema.findById(data.id);
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
    * @param {data} data UpdateNutrition
   * @return {Object} updated Nutrition Information
   */
  async update(data: UpdateNutrition) {
    try {
      const updateData = {
        'name': data.name,
        'description': data.description,
        'status': data.status,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      };
      await NutritionSchema
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .then((nutrition) => nutrition)
        .catch((error: any) => {
          return error;
        });
      return 'Nutrition updated successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
    * @param {data} data DeleteNutrition
   * @return {Object} null
   */
  async delete(data: DeleteNutrition) {
    try {
      // return await NutritionSchema.findOneAndDelete(
      //   {
      //     _id: ObjectId(data.ids[0])
      //   },
      //   {
      //     __user: { last_modified_by: ObjectId(data.last_modified_by) },
      //   }
      // )
      if (data.ids) {
        return NutritionSchema.updateMany(
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
   * @param {data} data GetNutritions
   * @return {Object} all nutritions
   */
  async get(data: GetNutritions) {
    if (data.type === 'health_plan') {
      data.perPage = await NutritionSchema.find({ status: true }).countDocuments({});
    }
    try {
      const nutritionCommand = new Recommendations({
        query: data,
        schema: NutritionSchema,
        'collectionName': 'Nutrition'
      });
      return await new CommandFactory().getCommand(
        nutritionCommand.path,
        true,
        nutritionCommand,
      );
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
