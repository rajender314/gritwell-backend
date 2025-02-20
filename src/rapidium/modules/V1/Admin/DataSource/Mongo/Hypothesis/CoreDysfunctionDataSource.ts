import { CreateCoreDysfunction }
  from '@basePath/Admin/Commands/CreateCoreDysfunction';
import { GetCoreDysfunction } from '@basePath/Admin/Commands/GetCoreDysfunction';
import { GetCoreDysfunctions }
  from '@basePath/Admin/Commands/GetCoreDysfunctions';
import { UpdateCoreDysfunction }
  from '@basePath/Admin/Commands/UpdateCoreDysfunction';
import { CoreDysfunctionSchema }
  from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/CoreDysfunctionSchema';
import { Hypothesis } from '@basePath/Admin/Commands/Hypothesis';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
/**
 * class CoreDysfunctionDataSource
 */
export default class CoreDysfunctionDataSource {
  /**
     *
     * @param {data} data CreateCoreDysfunction Command
     * @return {Object} newly created Goal
     */
  async create(data: CreateCoreDysfunction) {
    try {
      const totalDys = await CoreDysfunctionSchema.countDocuments();
      const uuid = `DYS${totalDys + 1}`;
      await CoreDysfunctionSchema.create({
        'name': data.name,
        'uuid': uuid,
        'status': data.status,
        'created_by': data.created_by,
        'created_date': data.created_date,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      });
      return 'Core Dysfunction added successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetCoreDysfunction Command
     * @return {Object} newly single CoreDysfunction based on Id
     */
  async view(data: GetCoreDysfunction) {
    try {
      return await CoreDysfunctionSchema.findById(data.id, {
        _id: 1,
        name: 1,
        status: 1,
      });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
   * @param {data} data UpdateGoal
  * @return {Object} updated Goal Information
  */
  async update(data: UpdateCoreDysfunction) {
    try {
      const updateData = {
        'name': data.name,
        'status': data.status,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      };
      await CoreDysfunctionSchema
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .then((CoreDysfunction) => CoreDysfunction)
        .catch((error: any) => {
          return error;
        });
        return 'Core Dysfunction updated successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetCoreDysfunctions Command
     * @return {Object} get CoreDysfunction based on search and sort
     */
  async get(data: GetCoreDysfunctions) {
    try {
      const coreDysfunctionCommand = new Hypothesis({ 'query': data, 'schema': CoreDysfunctionSchema,'collectionName': 'CoreDysfunction' });
      return await new CommandFactory().getCommand(coreDysfunctionCommand.path, true, coreDysfunctionCommand);
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
