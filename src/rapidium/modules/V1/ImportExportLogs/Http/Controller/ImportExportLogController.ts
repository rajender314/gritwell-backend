import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { ImportExportLog } from '@basePath/ImportExportLogs/Commands/ImportExportLog';

/**
 * class ImportExportLogController
 */
export default class ImportExportLogController extends BaseController {
    /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     * @return {Object}
     */
    async saveImportExportLog(req: Request, res: Response, next) {
        const importExportLogCommand = new ImportExportLog(req);
        await new BaseController().run(
            importExportLogCommand.path,
            importExportLogCommand,
            res,
            true,
            false,
            next,
            req,
        );
    }

    /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     * @return {Object}
     */
    async getImportExportLogs(req: Request, res: Response, next) {
        // const importExportLogCommand = new GetImportExportLogs(req);
        // await new BaseController().run(
        //     importExportLogCommand.path,
        //     importExportLogCommand,
        //     res,
        //     true,
        //     false,
        //     next,
        //     req,
        // );
    }
}
