import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {GetMaster} from '@basePath/Master/Commands/GetMaster';

// const environment = process.env;

/**
 * class MasterController
 */
export default class MasterController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async getMasters(req: Request, res: Response, next: any) {
    const getCommand = new GetMaster(req);
    await new BaseController().run(
        getCommand.path,
        getCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
}
