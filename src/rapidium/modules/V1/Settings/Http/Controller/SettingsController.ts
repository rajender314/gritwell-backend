import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {Settings} from '@basePath/Settings/Commands/Settings';
import {EmailControllerList}
  from '@basePath/Settings/Commands/EmailControllerList';
// import path from 'path';
/**
 * Controller class for SettingsController
 */
export default class SettingsController extends BaseController {
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async emailControllerList(req: Request, res: Response, next: any) {
    const addCommand = new EmailControllerList(req);
    await new BaseController().run(
        addCommand.path,
        addCommand,
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
  */
  async updateSettings(req: Request, res: Response, next: any) {
    const addCommand = new Settings(req);
    await new BaseController().run(
        addCommand.path,
        addCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
}
