import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {GetUsers} from '@basePath/Admin/Commands/GetUsers';
import {CreateUser} from '@basePath/Admin/Commands/CreateUser';
import {GetUserDetails} from '@basePath/Admin/Commands/GetUserDetails';
import {UpdateUser} from '@basePath/Admin/Commands/UpdateUser';
import {DeleteProfilePicture}
  from '@basePath/Admin/Commands/DeleteProfilePicture';
/**
 * class UsersController
 */
export default class UsersController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async createUser(req: Request, res: Response, next: any) {
    const getCommand = new CreateUser(req);
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
  async getUsers(req: Request, res: Response, next: any) {
    const getCommand = new GetUsers(req);
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
  async getUserDetails(req: Request, res: Response, next: any) {
    const getCommand = new GetUserDetails(req);
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
  async updateUser(req: Request, res: Response, next: any) {
    const getCommand = new UpdateUser(req);
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
  async deleteProfilePicture(req: Request, res: Response, next: any) {
    const getCommand = new DeleteProfilePicture(req);
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
