import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { DownloadGoal } from '@basePath/Exports/Commands/DownloadGoal';
import { DownloadDiagnosis }
    from '@basePath/Exports/Commands/DownloadDiagnosis';
import { DownloadRootCause }
    from '@basePath/Exports/Commands/DownloadRootCause';
import { DownloadCoreDysfunction }
    from '@basePath/Exports/Commands/DownloadCoreDysfunction';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ImportExportLog }
    from '@basePath/ImportExportLogs/Commands/ImportExportLog';
import {
    IHypothesis
} from '@basePath/Exports/Interfaces/IExport';
import ExcelWriter from '@rapCoreLibraries/ExcelWriter';
import BaseHelper from '@rapCoreHelpers/BaseHelper';
const TokenModel =
    require('@basePath/Middleware/DataSource/Mongo/Model/token.js');
/**
 * class ExportHypothesisController
 */
export default class ExportHypothesisController extends BaseController {
    /**
      * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async verifyToken(req: Request, res: Response, next) {
        const queryParams = req['query'];
        const token = queryParams.token;
        const currentDate = new Date();
        const tokenData = await TokenModel.findOne(
            {
                accessToken: token,
                accessTokenExpiresAt: { $gt: currentDate },
            },
        );
        if (tokenData == null) {
            res
                .status(500)
                .send({ status: false, message: 'token not found/invalid token' });
        } else {
            req.headers.user_id = tokenData.user.user_id;
            next();
        }
    }

    /**
      * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async downloadGoal(req: Request, res: Response, next) {
        const queryParams = req['query'];
        const data = {
            'search': queryParams.search,
        };

        const goalCommand = new DownloadGoal({ query: data });
        const goals: IHypothesis[] = await new CommandFactory().getCommand(
            goalCommand.path,
            true,
            goalCommand,
        );

        const headers = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Status', key: 'status', width: 25 },
            { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
        ];

        const excelWriter = new ExcelWriter();
        const workbook = await excelWriter.write(goals, 'Goal', headers);

        //Download Log 
        const importExportLogCommand = new ImportExportLog({
            action: 'download',
            collectionName: 'Goal',
            created_by: req.headers.user_id,
            last_modified_by: req.headers.user_id
        });
        await new CommandFactory().getCommand(
            importExportLogCommand.path,
            true,
            importExportLogCommand,
        );

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        const date = new BaseHelper().Date();
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + `Goals_${date}.xlsx`,
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    }

    /**
      * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async downloadDiagnosis(req: Request, res: Response, next) {
        const queryParams = req['query'];
        const data = {
            'search': queryParams.search,
        };

        const diagnosisCommand = new DownloadDiagnosis({ query: data });
        const diagnoses: IHypothesis[] = await new CommandFactory().getCommand(
            diagnosisCommand.path,
            true,
            diagnosisCommand,
        );

        const headers = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Status', key: 'status', width: 25 },
            { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
        ];

        const excelWriter = new ExcelWriter();
        const workbook = await excelWriter.write(diagnoses, 'Diagnosis', headers);

        //Download Log 
        const importExportLogCommand = new ImportExportLog({
            action: 'download',
            collectionName: 'Diagnosis',
            created_by: req.headers.user_id,
            last_modified_by: req.headers.user_id
        });
        await new CommandFactory().getCommand(
            importExportLogCommand.path,
            true,
            importExportLogCommand,
        );

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        const date = new BaseHelper().Date();
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + `Diagnosis_${date}.xlsx`,
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    }

    /**
      * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async downloadRootCause(req: Request, res: Response, next) {
        const queryParams = req['query'];
        const data = {
            'search': queryParams.search,
        };

        const rootCauseCommand = new DownloadRootCause({ query: data });
        const rootCauses: IHypothesis[] = await new CommandFactory().getCommand(
            rootCauseCommand.path,
            true,
            rootCauseCommand,
        );

        const headers = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Status', key: 'status', width: 25 },
            { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
        ];

        const excelWriter = new ExcelWriter();
        const workbook = await excelWriter.write(rootCauses, 'RootCause', headers);

        //Download Log 
        const importExportLogCommand = new ImportExportLog({
            action: 'download',
            collectionName: 'RootCause',
            created_by: req.headers.user_id,
            last_modified_by: req.headers.user_id
        });
        await new CommandFactory().getCommand(
            importExportLogCommand.path,
            true,
            importExportLogCommand,
        );

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        const date = new BaseHelper().Date();
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + `Root_Cause_${date}.xlsx`,
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    }

    /**
      * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async downloadCoreDysfunction(req: Request, res: Response, next) {
        const queryParams = req['query'];
        const data = {
            'search': queryParams.search,
        };

        const coreDysfunctionCommand = new DownloadCoreDysfunction({ query: data });
        const coreDysfunctions: IHypothesis[] = await new CommandFactory().getCommand(
            coreDysfunctionCommand.path,
            true,
            coreDysfunctionCommand,
        );

        const headers = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Status', key: 'status', width: 25 },
            { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
        ];

        const excelWriter = new ExcelWriter();
        const workbook = await excelWriter.write(coreDysfunctions, 'Imbalance', headers);

        //Download Log 
        const importExportLogCommand = new ImportExportLog({
            action: 'download',
            collectionName: 'CoreDysfunction',
            created_by: req.headers.user_id,
            last_modified_by: req.headers.user_id
        });
        await new CommandFactory().getCommand(
            importExportLogCommand.path,
            true,
            importExportLogCommand,
        );
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        const date = new BaseHelper().Date();
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + `Core_Dysfunction_${date}.xlsx`,
        );
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    }
}

