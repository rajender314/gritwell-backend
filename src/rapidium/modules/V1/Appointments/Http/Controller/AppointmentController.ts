import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { ClientAppointments } from '@basePath/Appointments/Commands/ClientAppointments';
import { CurrentAppointment } from '@basePath/Appointments/Commands/CurrentAppointment';
import { UpdateAppointment } from '@basePath/Appointments/Commands/UpdateAppointment';
import { GetClientAppointmentNotes } from '@basePath/Appointments/Commands/GetClientAppointmentNotes';
import { CreateClientAppointmentNotes } from '@basePath/Appointments/Commands/CreateClientAppointmentNotes';
import { DeleteAppointmentNotes } from '@basePath/Appointments/Commands/DeleteAppointmentNotes';
import { Schedules } from '@basePath/Appointments/Commands/Schedules';
import { AppointmentStatusesSchema }
  from
  '@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema';

/**
 * class AppointmentController
 */
export default class AppointmentController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async getClientAppointments(req: Request, res: Response, next: any) {
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
  async getCurrentAppointment(req: Request, res: Response, next: any) {
    const getCommand = new CurrentAppointment(req);
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
  async updateAppointment(req: Request, res: Response, next: any) {
    const getCommand = new UpdateAppointment(req);
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
  async getClientAppointmentNotes(req: Request, res: Response, next: any) {
    const getCommand = new GetClientAppointmentNotes(req);
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
  async createClientAppointmentNotes(req: Request, res: Response, next: any) {
    const getCommand = new CreateClientAppointmentNotes(req);
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
  async deleteAppointmentNotes(req: Request, res: Response, next: any) {
    const getCommand = new DeleteAppointmentNotes(req);
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
  async mySchedule(req: Request, res: Response, next: any) {
    const getCommand = new Schedules(req);
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
  async appointmentStatuses(req: Request, res: Response, next: any) {
    const code = ['attended', 'no-show', 'late-show'];
    const statuses = await AppointmentStatusesSchema.find({ code: { $in: code } }, {
      // const statuses = await AppointmentStatusesSchema.find({}, {
      _id: 1,
      value: '$_id',
      label: '$name',
      code: 1,
      color: 1
    });
    res.json({
      status: true,
      data: { result: statuses }, status_code: 200,
      message: "Successful"
    });
  }
}
