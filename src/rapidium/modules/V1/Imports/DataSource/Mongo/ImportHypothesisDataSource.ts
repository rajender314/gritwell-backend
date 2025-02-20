import { ImportHypothesis }
    from '@basePath/Imports/Commands/ImportHypothesis';
import ExcelReader from '@rapCoreLibraries/ExcelReader';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import {
    IHypothesis,
    IDBHypothesis,
} from '@basePath/Imports/Interfaces/IImport';
import { ImportExportLog }
    from '@basePath/ImportExportLogs/Commands/ImportExportLog';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
/**
 * class ImportHypothesisDataSource
 */
export default class ImportHypothesisDataSource {
    /**
     * @param {data} data ImportHypothesis
     * @return {Object}
     */
    async import(data: ImportHypothesis) {
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
                const hypothesesInfo = await this.insertHypothesis(
                    data,
                    updatedExcelData
                );
                const uuids = uuid.concat(hypothesesInfo.insertedObj.filter(item => item))
                const inactivated = await this.inactivateHypothesis(data, uuids);
                hypothesesInfo.inactivated = inactivated;
                delete hypothesesInfo.insertedObj;

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
                return {status: true, data: hypothesesInfo};
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
     * @param {hypotheses} hypotheses
     * @return {Object}
     */
    insertHypothesis = async (
        data: ImportHypothesis,
        hypotheses: IHypothesis[],
    ) => {
        const excelCountData: any = {};
        let inserted = 0;
        let updated = 0;
        let insertedObj: any = [];
        await this.iRC(hypotheses, async (hypothesis: IHypothesis) => {
            const dbHypothesis: IDBHypothesis =
                await this.getDbHypothesis(data);
            const excelUploadData = await this.createOrUpdate(
                data,
                hypothesis,
                dbHypothesis,
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
   * @param {hypotheses} hypothesis
   * @param {dbHypothesis} dbHypothesis
   * @return {Object}
   */
    async createOrUpdate(
        data: ImportHypothesis,
        hypothesis: IHypothesis,
        dbHypothesis,
    ) {
        try {
            let insertedInfo: any = {};
            let updated = false;
            const payload = await this.getPayload(data, hypothesis);
            let id = '';
            if (hypothesis.uuid) {
                id =
                    dbHypothesis && dbHypothesis[hypothesis.uuid] ?
                        dbHypothesis[hypothesis.uuid].id :
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
                const createdHypothesis = await data.schema.create(payload);
                insertedInfo.createdUuid = createdHypothesis.uuid
            }
            return { insertedInfo, updated };
        } catch (err: any) {
            throw new ResourceNotFound(err, '');
        }
    }
    /**
   * @param {type} type
   * @param {hypothesis} hypothesis
   * @return {Object}
   */
    async getPayload(data: ImportHypothesis, hypothesis: IHypothesis) {
        let payload: IHypothesis = {} as IHypothesis;
        payload = {
            name: hypothesis.name,
            status: hypothesis.status,
            created_date: data.created_date,
            created_by: data.created_by,
            last_modified_date: data.last_modified_date,
            last_modified_by: data.last_modified_by
        };
        return payload;
    }
    /**
   * @param {data} data
   * @return {Object}
   */
    async getDbHypothesis(data: ImportHypothesis) {
        const hypothesis = await data.schema.find({});
        const hypothesisData: IDBHypothesis = {};
        if (hypothesis.length) {
            hypothesis.map((r) => {
                hypothesisData[r.uuid] = { id: r._id };
            });
        }
        return hypothesisData;
    }

    /**
   * @param {data} data
   * @param {uuid}
   *  @return {Object}
   */
    async inactivateHypothesis(data: ImportHypothesis, uuid: string[]) {
        const hypotheses = await data.schema.find(
            {
                uuid: { $nin: uuid },
            },
            {
                _id: 1
            })
        let inactivatedCount = 0;
        if (hypotheses.length) {
            const ids = hypotheses.map((hypothesis) => ObjectId(hypothesis._id));
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
