import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { DownloadNutrition } from '@basePath/Exports/Commands/DownloadNutrition';
import { DownloadLifeStyle } from '@basePath/Exports/Commands/DownloadLifeStyle';
import { DownloadSupplement }
  from '@basePath/Exports/Commands/DownloadSupplement';
import { DownloadTest } from '@basePath/Exports/Commands/DownloadTest';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import {
  INutrition,
  ILifeStyle,
  ISupplement,
  ITest,
} from '@basePath/Exports/Interfaces/IExport';
import ExcelWriter from '@rapCoreLibraries/ExcelWriter';
import BaseHelper from '@rapCoreHelpers/BaseHelper';
import { ImportExportLog }
  from '@basePath/ImportExportLogs/Commands/ImportExportLog';
const TokenModel =
  require('@basePath/Middleware/DataSource/Mongo/Model/token.js');
/**
 * class ExportRecommendationController
 */
export default class ExportRecommendationController extends BaseController {
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
  async downloadNutrition(req: Request, res: Response, next) {
    const queryParams = req['query'];
    const data = {
      'search': queryParams.search,
    };

    const nutritionCommand = new DownloadNutrition({ query: data });
    const nutritions: INutrition[] = await new CommandFactory().getCommand(
      nutritionCommand.path,
      true,
      nutritionCommand,
    );

    const headers = [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Status', key: 'status', width: 25 },
      { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
    ];

    const excelWriter = new ExcelWriter();
    const workbook = await excelWriter.write(nutritions, 'Nutrition', headers);

    //Download Log 
    const importExportLogCommand = new ImportExportLog({
      action: 'download',
      collectionName: 'Nutrition',
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
      'attachment; filename=' + `Nutrition_${date}.xlsx`,
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  }
  /**
    * @param {req} req
   * @param {res} res
   */
  async downloadLifeStyle(req: Request, res: Response) {
    const queryParams = req['query'];
    const data = {
      'search': queryParams.search,
    };

    const lifestyleCommand = new DownloadLifeStyle({ query: data });
    const lifestyle: ILifeStyle[] = await new CommandFactory().getCommand(
      lifestyleCommand.path,
      true,
      lifestyleCommand,
    );

    const headers = [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Status', key: 'status', width: 25 },
      { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
    ];

    const excelWriter = new ExcelWriter();
    const workbook = await excelWriter.write(lifestyle, 'Lifestyle', headers);

    //Download Log 
    const importExportLogCommand = new ImportExportLog({
      action: 'download',
      collectionName: 'LifeStyle',
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
      'attachment; filename=' + `Lifestyle_${date}.xlsx`,
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  }
  /**
    * @param {req} req
   * @param {res} res
   */
  async downloadSupplement(req: Request, res: Response) {
    const queryParams = req['query'];
    const data = {
      'search': queryParams.search,
    };

    const supplementCommand = new DownloadSupplement({ query: data });
    const supplements: ISupplement[] = await new CommandFactory().getCommand(
      supplementCommand.path,
      true,
      supplementCommand,
    );

    const headers = [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Brand', key: 'brand', width: 15 },
      { header: 'Dosage', key: 'dosage', width: 10 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Link', key: 'link', width: 55 },
      { header: 'Status', key: 'status', width: 25 },
      { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
    ];
    const excelWriter = new ExcelWriter();
    const workbook =
      await excelWriter.write(supplements, 'Supplement', headers);

    //Download Log 
    const importExportLogCommand = new ImportExportLog({
      action: 'download',
      collectionName: 'Supplement',
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
      'attachment; filename=' + `Supplement_${date}.xlsx`,
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  }
  /**
    * @param {req} req
   * @param {res} res
   */
  async downloadTest(req: Request, res: Response) {
    const queryParams = req['query'];
    const data = {
      'search': queryParams.search,
    };

    const testCommand = new DownloadTest({ query: data });
    const tests: ITest[] = await new CommandFactory().getCommand(
      testCommand.path,
      true,
      testCommand,
    );

    const headers = [
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Brand', key: 'brand', width: 15 },
      { header: 'Price', key: 'price', width: 10 },
      { header: 'Type', key: 'type', width: 10 },
      { header: 'Link', key: 'link', width: 55 },
      { header: 'Status', key: 'status', width: 25 },
      { header: 'UUID', key: 'uuid', width: 9, outlineLevel: 1 },
    ];
    const excelWriter = new ExcelWriter();
    const workbook = await excelWriter.write(tests, 'Test', headers);

    const importExportLogCommand = new ImportExportLog({
      action: 'download',
      collectionName: 'Test',
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
      'attachment; filename=' + `Test_${date}.xlsx`,
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  }
}

