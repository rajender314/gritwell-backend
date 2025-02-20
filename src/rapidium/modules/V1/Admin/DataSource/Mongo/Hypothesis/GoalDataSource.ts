import { CreateGoal } from '@basePath/Admin/Commands/CreateGoal';
import { GetGoal } from '@basePath/Admin/Commands/GetGoal';
import { GetGoals } from '@basePath/Admin/Commands/GetGoals';
import { UpdateGoal } from '@basePath/Admin/Commands/UpdateGoal';
import { GoalSchema }
  from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/GoalSchema';
import { Hypothesis } from '@basePath/Admin/Commands/Hypothesis';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';

/**
 * class GoalDataSource
 */
export default class GoalDataSource {
  /**
     *
     * @param {data} data CreateGoal Command
     * @return {Object} newly created Goal
     */
  async create(data: CreateGoal) {
    try {
      const totalGoals = await GoalSchema.countDocuments();
      const uuid = `GLS${totalGoals + 1}`;
      await GoalSchema.create({
        'name': data.name,
        'uuid': uuid,
        'status': data.status,
        'created_by': data.created_by,
        'created_date': data.created_date,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      });
      return 'Goal added successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetGoal Command
     * @return {Object} newly single Goal based on Id
     */
  async view(data: GetGoal) {
    try {
      return await GoalSchema.findById(data.id, { _id: 1, name: 1, status: 1 });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
    * @param {data} data UpdateGoal
   * @return {Object} updated Goal Information
   */
  async update(data: UpdateGoal) {
    try {
      const updateData = {
        'name': data.name,
        'status': data.status,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      };
      await GoalSchema
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .then((goal) => goal)
        .catch((error: any) => {
          return error;
        });
        return 'Goal updated successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetGoals Command
     * @return {Object} get goals based on search and sort
     */
  async get(data: GetGoals) {
    try {
      const goalCommand = new Hypothesis({ 'query': data, 'schema': GoalSchema, 'collectionName': 'Goal' });
      return await new CommandFactory().getCommand(goalCommand.path, true, goalCommand);
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
