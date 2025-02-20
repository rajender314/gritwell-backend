import { CreateRootCause } from '@basePath/Admin/Commands/CreateRootCause';
import { GetRootCause } from '@basePath/Admin/Commands/GetRootCause';
import { UpdateRootCause } from '@basePath/Admin/Commands/UpdateRootCause';
import { GetRootCauses } from '@basePath/Admin/Commands/GetRootCauses';
import { RootCauseSchema }
  from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/RootCauseSchema';
import { Hypothesis } from '@basePath/Admin/Commands/Hypothesis';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
/**
 * class RootCauseDataSource
 */
export default class RootCauseDataSource {
  /**
     *
     * @param {data} data CreateRootCause Command
     * @return {Object} newly created RootCause
     */
  async create(data: CreateRootCause) {
    try {
      const totalRootCauses = await RootCauseSchema.countDocuments();
      const uuid = `ROC${totalRootCauses + 1}`;
      await RootCauseSchema.create({
        'name': data.name,
        'uuid': uuid,
        'status': data.status,
        'created_by': data.created_by,
        'created_date': data.created_date,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      });
      return 'Root Cause added successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetRootCause Command
     * @return {Object} newly single RootCause based on Id
     */
  async view(data: GetRootCause) {
    try {
      return await RootCauseSchema.findById(data.id, {
        _id: 1,
        name: 1,
        status: 1,
      });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
   * @param {data} data UpdateRootCause
  * @return {Object} updated RootCause Information
  */
  async update(data: UpdateRootCause) {
    try {
      const updateData = {
        'name': data.name,
        'status': data.status,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      };
      await RootCauseSchema
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .then((rootCause) => rootCause)
        .catch((error: any) => {
          return error;
        });
        return 'Root Cause updated successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetRootCauses Command
     * @return {Object} get diagnosis based on search and sort
     */
  async get(data: GetRootCauses) {
    try {
      const rootCauseCommand = new Hypothesis({ 'query': data, 'schema': RootCauseSchema, 'collectionName': 'RootCause' });
      return await new CommandFactory().getCommand(rootCauseCommand.path, true, rootCauseCommand);
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
