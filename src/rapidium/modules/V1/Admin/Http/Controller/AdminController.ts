import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {AddUser} from '@basePath/Admin/Commands/AddUser';
import {GetUser} from '@basePath/Admin/Commands/GetUser';
import {EditUser} from '@basePath/Admin/Commands/EditUser';
import {GetTimeSlots} from '@basePath/Admin/Commands/GetTimeSlots';
import {GetRole} from '@basePath/Admin/Commands/GetRole';
import {GetRoleDetails} from '@basePath/Admin/Commands/GetRoleDetails';
import {EditRole} from '@basePath/Admin/Commands/EditRole';
import {GetPermission} from '@basePath/Admin/Commands/GetPermission';
import {GetSpecialists} from '@basePath/Admin/Commands/GetSpecialists';
import {GetExperiences} from '@basePath/Admin/Commands/GetExperiences';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';

const environment = process.env;
/**
 * class AdminController
 */
export default class AdminController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async addUser(req: Request, res: Response, next: any) {
    const addCommand = new AddUser(req);
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
  async getUser(req: Request, res: Response, next: any) {
    const getCommand = new GetUser(req);

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
  async editUser(req: Request, res: Response, next: any) {
    const addCommand = new EditUser(req);
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
 */
  async uploadProfilePic(req, res) {
    try {
      const expression: any = /(?:\.([^.]+))?$/;
      const result = {};
      if (req.file.filename) {
        const ext = expression.exec(req.file.originalname)[1];
        // var domain_Url = req.protocol + '://' + req.get('host') + '/' ;
        let dispayUrl = environment.api_base_url + req.file.path;
        dispayUrl = dispayUrl.replace(/\\/g, '/');
        // let locations = req.file.path;
        // locations = locations.replace(/\\/g, '/');
        const dropBox =
        {
          original_name: req.file.destination + req.file.originalname,
          filename: req.file.destination + req.file.filename,
          file_path: dispayUrl,
          mimetype: req.file.mimetype,
          type: ext,
        };
        result['success'] = true;
        result['data'] = dropBox;
        result['message'] = 'File uploaded successfully.';
        res.status(200).send(result);
      } else {
        result['success'] = false;
        result['message'] = 'Please upload a file.';
        res.status(404).send(result);
      }
    } catch (err: any) {
      throw new ResourceNotFound(
          'Unable to upload a file, Please try again later',
          '');
    }
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async getTimeSlots(req: Request, res: Response, next: any) {
    const addCommand = new GetTimeSlots(req);
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
  async getRole(req: Request, res: Response, next) {
    const addCommand = new GetRole(req);
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
  async getRoleDetails(req: Request, res: Response, next) {
    const addCommand = new GetRoleDetails(req);
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
  async editRole(req: Request, res: Response, next) {
    const addCommand = new EditRole(req);
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
  async getPermission(req: Request, res: Response, next) {
    const addCommand = new GetPermission(req);
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
  async getSpecialists(req: Request, res: Response, next) {
    const addCommand = new GetSpecialists(req);
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
  async getExperiences(req: Request, res: Response, next) {
    const addCommand = new GetExperiences(req);
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
