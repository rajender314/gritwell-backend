import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';

import {CreateGoal} from '@basePath/Admin/Commands/CreateGoal';
import {GetGoal} from '@basePath/Admin/Commands/GetGoal';
import {GetGoals} from '@basePath/Admin/Commands/GetGoals';
import {UpdateGoal} from '@basePath/Admin/Commands/UpdateGoal';

import {CreateDiagnosis} from '@basePath/Admin/Commands/CreateDiagnosis';
import {GetDiagnosis} from '@basePath/Admin/Commands/GetDiagnosis';
import {GetDiagnosises} from '@basePath/Admin/Commands/GetDiagnosises';
import {UpdateDiagnosis} from '@basePath/Admin/Commands/UpdateDiagnosis';

import {CreateRootCause} from '@basePath/Admin/Commands/CreateRootCause';
import {GetRootCause} from '@basePath/Admin/Commands/GetRootCause';
import {GetRootCauses} from '@basePath/Admin/Commands/GetRootCauses';
import {UpdateRootCause} from '@basePath/Admin/Commands/UpdateRootCause';

import {CreateCoreDysfunction}
  from '@basePath/Admin/Commands/CreateCoreDysfunction';
import {GetCoreDysfunction} from '@basePath/Admin/Commands/GetCoreDysfunction';
import {GetCoreDysfunctions}
  from '@basePath/Admin/Commands/GetCoreDysfunctions';
import {UpdateCoreDysfunction}
  from '@basePath/Admin/Commands/UpdateCoreDysfunction';


/**
 * class HypothesisController
 */
export default class HypothesisController extends BaseController {
  /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     */
  async createGoal(req: Request, res: Response, next) {
    const addCommand = new CreateGoal(req);
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
  async getGoal(req: Request, res: Response, next) {
    const addCommand = new GetGoal(req);
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
  async getGoals(req: Request, res: Response, next) {
    const addCommand = new GetGoals(req);
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
  async updateGoal(req: Request, res: Response, next) {
    const addCommand = new UpdateGoal(req);
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
  async createDiagnosis(req: Request, res: Response, next) {
    const addCommand = new CreateDiagnosis(req);
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
  async getDiagnosis(req: Request, res: Response, next) {
    const addCommand = new GetDiagnosis(req);
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
  async getDiagnosises(req: Request, res: Response, next) {
    const addCommand = new GetDiagnosises(req);
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
  async updateDiagnosis(req: Request, res: Response, next) {
    const addCommand = new UpdateDiagnosis(req);
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
  async createRootCause(req: Request, res: Response, next) {
    const addCommand = new CreateRootCause(req);
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
  async getRootCause(req: Request, res: Response, next) {
    const addCommand = new GetRootCause(req);
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
  async getRootCauses(req: Request, res: Response, next) {
    const addCommand = new GetRootCauses(req);
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
  async updateRootCause(req: Request, res: Response, next) {
    const addCommand = new UpdateRootCause(req);
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
  async createCoreDysfunction(req: Request, res: Response, next) {
    const addCommand = new CreateCoreDysfunction(req);
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
  async getCoreDysfunction(req: Request, res: Response, next) {
    const addCommand = new GetCoreDysfunction(req);
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
  async getCoreDysfunctions(req: Request, res: Response, next) {
    const addCommand = new GetCoreDysfunctions(req);
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
  async updateCoreDysfunction(req: Request, res: Response, next) {
    const addCommand = new UpdateCoreDysfunction(req);
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
