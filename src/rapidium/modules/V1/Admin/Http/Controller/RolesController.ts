import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {GetRole} from '@basePath/Admin/Commands/GetRole';
import {GetRoleDetails} from '@basePath/Admin/Commands/GetRoleDetails';
import {EditRole} from '@basePath/Admin/Commands/EditRole';
/**
 * class RolesController
 */
export default class RolesController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async getRoles(req: Request, res: Response, next: any) {
    const getCommand = new GetRole(req);
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
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async getRoleDetails(req: Request, res: Response, next: any) {
    const getCommand = new GetRoleDetails(req);
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
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async updateRole(req: Request, res: Response, next: any) {
    const getCommand = new EditRole(req);
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
