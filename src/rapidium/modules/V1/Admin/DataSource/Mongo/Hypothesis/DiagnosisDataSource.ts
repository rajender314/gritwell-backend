import { CreateDiagnosis } from '@basePath/Admin/Commands/CreateDiagnosis';
import { GetDiagnosis } from '@basePath/Admin/Commands/GetDiagnosis';
import { GetDiagnosises } from '@basePath/Admin/Commands/GetDiagnosises';
import { UpdateDiagnosis } from '@basePath/Admin/Commands/UpdateDiagnosis';
import { DiagnosisSchema }
  from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/DiagnosisSchema';
import { Hypothesis } from '@basePath/Admin/Commands/Hypothesis';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
/**
 * class DiagnosisDataSource
 */
export default class DiagnosisDataSource {
  /**
     *
     * @param {data} data CreateDiagnosis Command
     * @return {Object} newly created Goal
     */
  async create(data: CreateDiagnosis) {
    try {
      const totalDiagnosis = await DiagnosisSchema.countDocuments();
      const uuid = `DIA${totalDiagnosis + 1}`;
      await DiagnosisSchema.create({
        'name': data.name,
        'uuid': uuid,
        'status': data.status,
        'created_by': data.created_by,
        'created_date': data.created_date,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      });
      return 'Diagnosis added successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetDiagnosis Command
     * @return {Object} newly single Diagnosis based on Id
     */
  async view(data: GetDiagnosis) {
    try {
      return await DiagnosisSchema.findById(data.id, {
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
  async update(data: UpdateDiagnosis) {
    try {
      const updateData = {
        'name': data.name,
        'status': data.status,
        'last_modified_by': data.last_modified_by,
        'last_modified_date': data.last_modified_date,
      };
      await DiagnosisSchema
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .then((diagnosis) => diagnosis)
        .catch((error: any) => {
          return error;
        });
      return 'Diagnosis updated successfully';
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     *
     * @param {data} data GetDiagnosises Command
     * @return {Object} get diagnosis based on search and sort
     */
  async get(data: GetDiagnosises) {
    try {
      const diagnosisCommand = new Hypothesis({ 'query': data, 'schema': DiagnosisSchema, 'collectionName': 'Diagnosis' });
      return await new CommandFactory().getCommand(diagnosisCommand.path, true, diagnosisCommand);
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}
