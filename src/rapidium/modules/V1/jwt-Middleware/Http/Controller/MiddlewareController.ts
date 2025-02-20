import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {VerifyMe} from '../../Commands/VerifyMe';
import {VerifyCustomer} from '../../Commands/VerifyCustomer';
import {VerifyOrgUser} from '../../Commands/VerifyOrgUser';
import {VerifyGuest} from '../../Commands/VerifyGuest';
import {VerifyToken} from '../../Commands/VerifyToken';
import {VerifyAdmin} from '../../Commands/VerifyAdmin';
import {VerifyRole} from '../../Commands/VerifyRole';
import {VerifyBeneficiary} from '../../Commands/VerifyBeneficiary';
/**
 * Controller class for MiddlewareController
 */
export default class MiddlewareController extends BaseController {
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async verifyMe(req: Request, res: Response, next:any) {
    const addCommand = new VerifyMe(req);
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
  async verifyCustomer(req: Request, res: Response, next:any) {
    const addCommand = new VerifyCustomer(req);
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
  async verifyOrgUser(req: Request, res: Response, next:any) {
    const addCommand = new VerifyOrgUser(req);
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
  async verifyGuest(req: any, res: Response, next:any) {
    const addCommand = new VerifyGuest(req);
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
  async verifyToken(req: Request, res: Response, next:any) {
    const addCommand = new VerifyToken(req);
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
  async verifyAdmin(req: Request, res: Response, next:any) {
    const addCommand = new VerifyAdmin(req);
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
  async verifyRole(req: Request, res: Response, next:any) {
    const addCommand = new VerifyRole(req);
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
  async verifyBeneficiary(req: Request, res: Response, next:any) {
    const addCommand = new VerifyBeneficiary(req);
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
