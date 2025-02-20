import { ImportRecommendation }
  from '@basePath/Imports/Commands/ImportRecommendation';
import ExcelReader from '@rapCoreLibraries/ExcelReader';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import {
  IRecommendation,
  IDBRecommendation,
} from '@basePath/Imports/Interfaces/IImport';
import { ImportExportLog }
  from '@basePath/ImportExportLogs/Commands/ImportExportLog';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ObjectId } from '@rapCore/src/Mongodb/Types';

/**
 * class ImportRecommendationDataSource
 */
export default class ImportRecommendationDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async import(data: ImportRecommendation) {
    try {
      const schema = data.excelSchema;
      const excelReader = new ExcelReader();
      const excelData = await excelReader.getData(data.filenamePath, schema, data.sheetName);

      if (excelData.success) {
        const updatedExcelData = excelData.data.map(obj =>
          obj.status === "ACTIVE" ? { ...obj, status: true } : { ...obj, status: false }
        );
        var uuid: string[] = [];
        excelData.data.forEach(function (obj) {
          uuid.push(obj.uuid);
        })
        const recommendationsInfo = await this.insertRecommendations(
          data,
          updatedExcelData
        );
        const uuids = uuid.concat(recommendationsInfo.insertedObj.filter(item => item))

        const inactivated = await this.inactivateRecommendations(data, uuids);
        recommendationsInfo.inactivated = inactivated;
        delete recommendationsInfo.insertedObj;

        //Upload Log
        const importExportLogCommand = new ImportExportLog({
          action: 'upload',
          collectionName: data.sheetName,
          created_by: data.created_by,
          last_modified_by: data.last_modified_by
        });
        await new CommandFactory().getCommand(
          importExportLogCommand.path,
          true,
          importExportLogCommand,
        );
        return {status: true, data: recommendationsInfo};
      } else {
        return {status: false, message: excelData.data.join(', ')};
      }

    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
   * @param {array} array
   * @param {callback} callback
   */
  iRC = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };
  /**
    * @param {data} data
   * @param {recommendations} recommendations
   * @return {Object}
   */
  insertRecommendations = async (
    data: ImportRecommendation,
    recommendations: IRecommendation[],
  ) => {
    const excelCountData: any = {};
    let inserted = 0;
    let updated = 0;
    let insertedObj: any = [];
    await this.iRC(recommendations, async (recommendation: IRecommendation) => {
      const dbRecommendations: IDBRecommendation =
        await this.getDbRecommendations(data);
      const excelUploadData = await this.createOrUpdate(
        data,
        recommendation,
        dbRecommendations,
      );
      if (excelUploadData.insertedInfo.inserted) {
        inserted++;
      }
      if (excelUploadData.insertedInfo.createdUuid) {
        insertedObj.push(excelUploadData.insertedInfo.createdUuid)
      }
      if (excelUploadData.updated) {
        updated++;
      }
      excelCountData.inserted = inserted;
      excelCountData.updated = updated;
    });
    excelCountData.insertedObj = insertedObj;
    return excelCountData;
  };
  /**
 * @param {data} data
 * @param {recommendation} recommendation
 * @param {dbRecommendations} dbRecommendations
 * @return {Object}
 */
  async createOrUpdate(
    data: ImportRecommendation,
    recommendation: IRecommendation,
    dbRecommendations,
  ) {
    try {
      let insertedInfo: any = {};
      let updated = false;
      const payload = await this.getPayload(data, recommendation);
      let id = '';
      if (recommendation.uuid) {
        id =
          dbRecommendations && dbRecommendations[recommendation.uuid] ?
            dbRecommendations[recommendation.uuid].id :
            '';
      }
      if (id != '') {
        updated = true;
        await data.schema.findByIdAndUpdate(id, payload, { new: true });
      } else {
        insertedInfo.inserted = true;
        const total = await data.schema.countDocuments({});
        const uuid = `${data.abbr}${total + 1}`;
        payload.uuid = uuid;
        const createdRecommendation = await data.schema.create(payload);
        insertedInfo.createdUuid = createdRecommendation.uuid
      }
      return { insertedInfo, updated };
    } catch (err: any) {
      throw new ResourceNotFound(err, '');
    }
  }
  /**
 * @param {type} type
 * @param {recommendation} recommendation
 * @return {Object}
 */
  async getPayload(data: ImportRecommendation, recommendation: IRecommendation) {
    const type = data.abbr;
    let payload: IRecommendation = {} as IRecommendation;
    if (type === 'NTR' || type === 'LFT') {
      payload = {
        name: recommendation.name,
        description: recommendation.description,
        status: recommendation.status,
        created_date: data.created_date,
        created_by: data.created_by,
        last_modified_date: data.last_modified_date,
        last_modified_by: data.last_modified_by
      };
    }
    if (type === 'SUP') {
      payload = {
        name: recommendation.name,
        description: recommendation.description,
        brand: recommendation.brand,
        dosage: recommendation.dosage,
        price: recommendation.price,
        link: recommendation.link,
        status: recommendation.status,
        created_date: data.created_date,
        created_by: data.created_by,
        last_modified_date: data.last_modified_date,
        last_modified_by: data.last_modified_by
      };
    }
    if (type === 'TST') {
      payload = {
        name: recommendation.name,
        description: recommendation.description,
        brand: recommendation.brand,
        price: recommendation.price,
        type: recommendation.type,
        link: recommendation.link,
        status: recommendation.status,
        created_date: data.created_date,
        created_by: data.created_by,
        last_modified_date: data.last_modified_date,
        last_modified_by: data.last_modified_by
      };
    }
    return payload;
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  async getDbRecommendations(data: ImportRecommendation) {
    const recommendation = await data.schema.find({});
    const recommendationData: IDBRecommendation = {};
    if (recommendation.length) {
      recommendation.map((r) => {
        recommendationData[r.uuid] = { id: r._id };
      });
    }
    return recommendationData;
  }

  /**
   * @param {data} data
   * @param {uuid}
   *  @return {Object}
   */
  async inactivateRecommendations(data: ImportRecommendation, uuid: string[]) {
    const recommendations = await data.schema.find(
      {
        uuid: { $nin: uuid },
      },
      {
        _id: 1
      })
    let inactivatedCount = 0;
    if (recommendations.length) {
      const ids = recommendations.map((recommendation) => ObjectId(recommendation._id));
      const inactivated = await data.schema.updateMany(
        {
          _id: { $in: ids },
        },
        {
          status: false
        })
      inactivatedCount = inactivated.nModified;
    }
    return inactivatedCount;

  }
}
