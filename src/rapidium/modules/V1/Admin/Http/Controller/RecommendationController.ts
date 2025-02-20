import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {GetNutrition} from '@basePath/Admin/Commands/GetNutrition';
import {GetNutritions} from '@basePath/Admin/Commands/GetNutritions';
import {CreateNutrition} from '@basePath/Admin/Commands/CreateNutrition';
import {UpdateNutrition} from '@basePath/Admin/Commands/UpdateNutrition';
import {DeleteNutrition} from '@basePath/Admin/Commands/DeleteNutrition';
import {GetLifeStyle} from '@basePath/Admin/Commands/GetLifeStyle';
import {GetLifeStyles} from '@basePath/Admin/Commands/GetLifeStyles';
import {CreateLifeStyle} from '@basePath/Admin/Commands/CreateLifeStyle';
import {UpdateLifeStyle} from '@basePath/Admin/Commands/UpdateLifeStyle';
import {DeleteLifeStyle} from '@basePath/Admin/Commands/DeleteLifeStyle';

import {CreateSupplement} from '@basePath/Admin/Commands/CreateSupplement';
import {UpdateSupplement} from '@basePath/Admin/Commands/UpdateSupplement';
import {DeleteSupplement} from '@basePath/Admin/Commands/DeleteSupplement';
import {GetSupplement} from '@basePath/Admin/Commands/GetSupplement';
import {GetSupplements} from '@basePath/Admin/Commands/GetSupplements';

import {CreateTest} from '@basePath/Admin/Commands/CreateTest';
import {UpdateTest} from '@basePath/Admin/Commands/UpdateTest';
import {GetTest} from '@basePath/Admin/Commands/GetTest';
import {GetTests} from '@basePath/Admin/Commands/GetTests';
import {DeleteTest} from '@basePath/Admin/Commands/DeleteTest';

/**
 * class RecommendationController
 */
export default class RecommendationController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async createNutrition(req: Request, res: Response, next) {
    const addCommand = new CreateNutrition(req);
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
  async updateNutrition(req: Request, res: Response, next) {
    const addCommand = new UpdateNutrition(req);
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
  async getNutrition(req: Request, res: Response, next) {
    const addCommand = new GetNutrition(req);
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
  async getNutritions(req: Request, res: Response, next) {
    const addCommand = new GetNutritions(req);
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
  async deleteNutrition(req: Request, res: Response, next) {
    const addCommand = new DeleteNutrition(req);
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
  async createLifeStyle(req: Request, res: Response, next) {
    const addCommand = new CreateLifeStyle(req);
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
  async updateLifeStyle(req: Request, res: Response, next) {
    const addCommand = new UpdateLifeStyle(req);
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
  async deleteLifeStyle(req: Request, res: Response, next) {
    const addCommand = new DeleteLifeStyle(req);
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
  async getLifeStyle(req: Request, res: Response, next) {
    const addCommand = new GetLifeStyle(req);
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
  async getLifeStyles(req: Request, res: Response, next) {
    const addCommand = new GetLifeStyles(req);
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
  async createSupplement(req: Request, res: Response, next) {
    const addCommand = new CreateSupplement(req);
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
  async updateSupplement(req: Request, res: Response, next) {
    const addCommand = new UpdateSupplement(req);
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
  async deleteSupplement(req: Request, res: Response, next) {
    const addCommand = new DeleteSupplement(req);
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
  async getSupplement(req: Request, res: Response, next) {
    const addCommand = new GetSupplement(req);
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
  async getSupplements(req: Request, res: Response, next) {
    const addCommand = new GetSupplements(req);
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
  async getTest(req: Request, res: Response, next) {
    const addCommand = new GetTest(req);
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
  async getTests(req: Request, res: Response, next) {
    const addCommand = new GetTests(req);
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
  async createTest(req: Request, res: Response, next) {
    const addCommand = new CreateTest(req);
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
  async updateTest(req: Request, res: Response, next) {
    const addCommand = new UpdateTest(req);
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
  async deleteTest(req: Request, res: Response, next) {
    const addCommand = new DeleteTest(req);
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
