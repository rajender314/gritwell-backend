import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';

// import path from "path";
import {SyncTypeForms} from '@basePath/Api/Commands/SyncTypeForms';
import {SyncTypeFormResonse} from '@basePath/Api/Commands/SyncTypeFormResonse';
import {SyncSetConsent} from '@basePath/Api/Commands/SyncSetConsent';

/**
 * class ApiController
 */
export default class ApiController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async syncTypeForms(req: Request, res: Response, next: any) {
    req.body.sync_type = 'forms';
    const syncCommand = new SyncTypeForms(req);
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
  async syncTypeFormQuestions(req: Request, res: Response, next: any) {
    req.body.sync_type = 'forms_questions';
    const syncCommand = new SyncTypeForms(req);
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
  async syncTypeFormResponse(req: Request, res: Response, next: any) {
    req.body.sync_type = 'forms_answers';
    const syncCommand = new SyncTypeFormResonse(req);
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
  async syncSetConsent(req: Request, res: Response, next: any) {
    req.body.sync_type = 'forms_answers';
    const syncCommand = new SyncSetConsent(req);
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
   async syncSetMsqConsent(req: Request, res: Response, next: any) {
    req.body.sync_type = 'msq_forms_answers';
    const syncCommand = new SyncSetConsent(req);
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
