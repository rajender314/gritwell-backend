import { Request, Response } from 'express';
import BaseController
  from '@rapCoreBase/Http/BaseController';
import { GetClients }
  from '@basePath/OfficeClients/Commands/GetClients';
import { GetClientDetails }
  from '@basePath/OfficeClients/Commands/GetClientDetails';
import { UpdateClient } from '@basePath/OfficeClients/Commands/UpdateClient';
import { GetRoleBasedUsers }
  from '@basePath/OfficeClients/Commands/GetRoleBasedUsers';
import { ClientAssignment }
  from '@basePath/OfficeClients/Commands/ClientAssignment'; 
import { HistoricalTests }
  from '@basePath/OfficeClients/Commands/HistoricalTests';
import { ClientNotes } from '@basePath/OfficeClients/Commands/ClientNotes';
import { CreateClientNotes }
  from '@basePath/OfficeClients/Commands/CreateClientNotes';
import { ClientAppointments }
  from '@basePath/OfficeClients/Commands/ClientAppointments';
import { ClientRecentActivities }
  from '@basePath/OfficeClients/Commands/ClientRecentActivities';

const environment = process.env;
/**
 * class ClientsController
 */
export default class ClientsController extends BaseController {
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async getClients(req: Request, res: Response, next: any) {
    const getCommand = new GetClients(req);
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
  async getClientDetails(req: Request, res: Response, next: any) {
    const getCommand = new GetClientDetails(req);
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
  async updateClient(req: Request, res: Response, next: any) {
    const getCommand = new UpdateClient(req);
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
  async getRoleUsersBySlug(req: Request, res: Response, next: any) {
    const getCommand = new GetRoleBasedUsers(req);
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
  async clientAssignment(req: Request, res: Response, next: any) {
    const getCommand = new ClientAssignment(req);
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
  async historicalTests(req: Request, res: Response, next: any) {
    req.body.type_form_id = environment.TYPE_FORM_INTAKE;
    req.body.type_form_question_id = environment.IF_PAST_TEST;
    const getCommand = new HistoricalTests(req);
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
  async clientNotes(req: Request, res: Response, next: any) {
    const getCommand = new ClientNotes(req);
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
  async createClientNotes(req: Request, res: Response, next: any) {
    const getCommand = new CreateClientNotes(req);
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
  async clientAppointments(req: Request, res: Response, next: any) {
    const getCommand = new ClientAppointments(req);
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
  async clientRecentActivities(req: Request, res: Response, next: any) {
    const getCommand = new ClientRecentActivities(req);
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
