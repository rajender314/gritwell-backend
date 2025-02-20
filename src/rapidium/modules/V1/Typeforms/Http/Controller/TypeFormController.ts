import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';

import { SyncHealthAssessment } from '@basePath/Typeforms/Commands/SyncHealthAssessment';
import { SyncIntake } from '@basePath/Typeforms/Commands/SyncIntake';
import { SyncSymptomAnalysis } from '@basePath/Typeforms/Commands/SyncSymptomAnalysis';
import { AppointmentServey } from '@basePath/Typeforms/Commands/AppointmentServey';
import { SyncClientHappiness } from '@basePath/Typeforms/Commands/SyncClientHappiness';

/**
 * class TypeFormController
 */
export default class TypeFormController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async syncHealthAssessment(req: Request, res: Response, next: any) {
    const syncCommand = new SyncHealthAssessment(req);
    await new BaseController().run(
      syncCommand.path,
      syncCommand,
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
  async syncIntake(req: Request, res: Response, next: any) {
    const syncCommand = new SyncIntake(req);
    await new BaseController().run(
      syncCommand.path,
      syncCommand,
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
  async syncSymptomAnalysis(req: Request, res: Response, next: any) {
    const syncCommand = new SyncSymptomAnalysis(req);
    await new BaseController().run(
      syncCommand.path,
      syncCommand,
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
  async appointmentSurvey(req: Request, res: Response, next: any) {
    const syncCommand = new AppointmentServey(req);
    await new BaseController().run(
      syncCommand.path,
      syncCommand,
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
   async syncClientHappiness(req: Request, res: Response, next: any) {
    const syncCommand = new SyncClientHappiness(req);
    await new BaseController().run(
      syncCommand.path,
      syncCommand,
      res,
      true,
      false,
      next,
      req,
    );
  }
}
