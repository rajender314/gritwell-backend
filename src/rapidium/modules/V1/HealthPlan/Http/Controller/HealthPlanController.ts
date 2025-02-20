import { Request, Response } from 'express';
import BaseController
    from '@rapCoreBase/Http/BaseController';
import { GetHealthPlan }
    from '@basePath/HealthPlan/Commands/GetHealthPlan';
import { GetHealthPlanDetails }
    from '@basePath/HealthPlan/Commands/GetHealthPlanDetails';
import { CreateHealthPlan }
    from '@basePath/HealthPlan/Commands/CreateHealthPlan';
import { CreateActivePlan }
    from '@basePath/HealthPlan/Commands/CreateActivePlan';
import { EditHealthPlan }
    from '@basePath/HealthPlan/Commands/EditHealthPlan';
import { EditInlineStatus }
    from '@basePath/HealthPlan/Commands/EditInlineStatus';
import { SubmitHealthPlan }
    from '@basePath/HealthPlan/Commands/SubmitHealthPlan';
import { DeleteHealthPlanDetails }
    from '@basePath/HealthPlan/Commands/DeleteHealthPlanDetails';
import { ClientStatusesSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/ClientStatusesSchema';
import { FrequencySchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/FrequencySchema';
import { UnitsSchema }
    from
    '@basePath/HealthPlan/DataSource/Models/Schema/UnitsSchema';
/**
 * class HealthPlanController
 */
export default class HealthPlanController extends BaseController {
    /**
    * @param {req} req
    * @param {res} res
    * @param {next} next
    */
    async get(req: Request, res: Response, next: any) {
        const getCommand = new GetHealthPlan(req);
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
    async getHealthPlanDetails(req: Request, res: Response, next: any) {
        const getCommand = new GetHealthPlanDetails(req);
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
    async create(req: Request, res: Response, next: any) {
        const getCommand = new CreateHealthPlan(req);
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
    async delete(req: Request, res: Response, next: any) {
        const getCommand = new DeleteHealthPlanDetails(req);
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
    async createActivePlan(req: Request, res: Response, next: any) {
        const getCommand = new CreateActivePlan(req);
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
    async editHealthPlan(req: Request, res: Response, next: any) {
        const getCommand = new EditHealthPlan(req);
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
    async editInlineStatus(req: Request, res: Response, next: any) {
        const getCommand = new EditInlineStatus(req);
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
    async submitHealthPlan(req: Request, res: Response, next: any) {
        const getCommand = new SubmitHealthPlan(req);
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
    async healthPlanStatuses(req: Request, res: Response, next: any) {
        let code: string[] = [];
        if (req.params.type === 'phasesOfCare') {
            code = ['active', 'complete', 'future', 'pause'];
        }
        if (req.params.type === 'nutrition' || req.params.type === 'testing' || req.params.type === 'supplement' || req.params.type === 'lifestyle') {
            code = ['active', 'inactive'];
        }
        const statuses = await ClientStatusesSchema.find({ code: { $in: code } }, {
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
    /**
    * @param {req} req
    * @param {res} res
    * @param {next} next
    */
    async healthPlanFrequencies(req: Request, res: Response, next: any) {
        const statuses = await FrequencySchema.find({}, {
            _id: 1,
            value: '$_id',
            label: '$name',
            code: 1
        });
        res.json({
            status: true,
            data: { result: statuses }, status_code: 200,
            message: "Successful"
        });
    }
    /**
    * @param {req} req
    * @param {res} res
    * @param {next} next
    */
    async healthPlanUnits(req: Request, res: Response, next: any) {
        const statuses = await UnitsSchema.find({}, {
            _id: 1,
            value: '$_id',
            label: '$name',
            code: 1
        });
        res.json({
            status: true,
            data: { result: statuses }, status_code: 200,
            message: "Successful"
        });
    }
}
