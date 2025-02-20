import { CreateTest } from '@basePath/Admin/Commands/CreateTest';
import { UpdateTest } from '@basePath/Admin/Commands/UpdateTest';
import { GetTest } from '@basePath/Admin/Commands/GetTest';
import { GetTests } from '@basePath/Admin/Commands/GetTests';
import { DeleteTest } from '@basePath/Admin/Commands/DeleteTest';
import { TestSchema } from '@basePath/Admin/DataSource/Models/Schema/TestSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { Recommendations } from '@basePath/Admin/Commands/Recommendations';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
/**
 * class TestDataSource
 */
export default class TestDataSource {
  /**
     * create
     * @param {data} data CreateSupplement Command
     * @return {Object} newly created Supplement
     */
  async create(data: CreateTest) {
    try {
      const totalTests = await TestSchema.countDocuments();
      const uuid = `TST${totalTests + 1}`;
      await TestSchema.create({
        'name': data.name,
        'description': data.description,
        'brand': data.brand,
        'price': data.price,
        'type': data.type,
        'link': data.link,
        'uuid': uuid,
        'status': data.status,
        'created_by': data.created_by,
        'created_date': data.created_date,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      });
      return 'Test added successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }


  /**
     *
     * @param {data} data GetTest Command
     * @return {Object} newly single supplement based on Id
     */
  async view(data: GetTest) {
    try {
      return await TestSchema.findById(data.id);
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     * update
     * @param {data} data UpdateTest Command
     * @return {Object} updated test
     */
  async update(data: UpdateTest) {
    try {
      const updateData = {
        'name': data.name,
        'description': data.description,
        'status': data.status,
        'brand': data.brand,
        'price': data.price,
        'type': data.type,
        'link': data.link,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      };
      await TestSchema
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .then((test) => test)
        .catch((error: any) => {
          return error;
        });
      return 'Test updated successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     * delete
     * @param {data} data DeleteTest
     * @return {Object} null
     */
  async delete(data: DeleteTest) {
    try {
      if (data.ids) {
        return TestSchema.updateMany(
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
     * @param {data} data GetTest
     * @return {Object} all Tests
     */
  async get(data: GetTests) {
    try {
      if (data.type === 'health_plan') {
        data.perPage = await TestSchema.find({ status: true }).countDocuments({});
      }
      const testCommand = new Recommendations({
        query: data,
        schema: TestSchema,
        'collectionName': 'Test'
      });
      return await new CommandFactory().getCommand(
        testCommand.path,
        true,
        testCommand,
      );
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
