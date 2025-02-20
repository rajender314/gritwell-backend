import { Request, Response } from 'express';
import BaseController
    from '@rapCoreBase/Http/BaseController'; 
import { GetClientGoals }
    from '@basePath/HealthProfile/Commands/GetClientGoals';
import { CreateClientGoals }
    from '@basePath/HealthProfile/Commands/CreateClientGoals';
import { GetClientHypothesis }
    from '@basePath/HealthProfile/Commands/GetClientHypothesis';
import { CreateClientHypothesis }
    from '@basePath/HealthProfile/Commands/CreateClientHypothesis';
import { GoalSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/GoalSchema';
import { CoreDysfunctionSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/CoreDysfunctionSchema';
import { RootCauseSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/RootCauseSchema';
import { DiagnosisSchema }
    from '@basePath/Admin/DataSource/Models/Schema/Hypothesis/DiagnosisSchema';
import { GetClientNotes }
    from '@basePath/HealthProfile/Commands/GetClientNotes';
import { CreateClientNotes }
    from '@basePath/HealthProfile/Commands/CreateClientNotes';
/**
 * class HealthProfileController
 */
export default class HealthProfileController extends BaseController {
    /**
    * @param {req} req
    * @param {res} res
    * @param {next} next
    */
    async getGoals(req: Request, res: Response, next: any) {
        const goals = await GoalSchema.find({}, {
            _id: 1,
            value: '$_id',
            label: '$name',
            code: 1
        });
        res.json({
            status: true,
            data: { result: goals }, status_code: 200,
            message: "Successful"
        });
    }
    /**
    * @param {req} req
    * @param {res} res
    * @param {next} next
    */
    async getClientGoals(req: Request, res: Response, next: any) {
        const getCommand = new GetClientGoals(req);
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
    async createClientGoals(req: Request, res: Response, next: any) {
        const getCommand = new CreateClientGoals(req);
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
    async getHypothesis(req: Request, res: Response, next: any) {
        const imbalance = await CoreDysfunctionSchema.find(
            { status: true },
            {
                _id: 1,
                value: '$_id',
                label: '$name'
            });

        //get rootcause
        const rootcause = await RootCauseSchema.find(
            { status: true },
            {
                _id: 1,
                value: '$_id',
                label: '$name'
            });

        //get diagnosis
        const diagnosis = await DiagnosisSchema.find(
            { status: true },
            {
                _id: 1,
                value: '$_id',
                label: '$name'
            });
        res.json({
            status: true,
            data: { imbalance, rootcause, diagnosis }, status_code: 200,
            message: "Successful"
        });
    }
    /**
    * @param {req} req
    * @param {res} res
    * @param {next} next
    */
    async getClientHypothesis(req: Request, res: Response, next: any) {
        const getCommand = new GetClientHypothesis(req);
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
    async createClientHypothesis(req: Request, res: Response, next: any) {
        const getCommand = new CreateClientHypothesis(req);
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
    async getClientNotes(req: Request, res: Response, next: any) {
        const getCommand = new GetClientNotes(req);
        await new BaseController().run(
            getCommand.path,
            getCommand,
            res,
            true,
            false,
            next,
            req,
        );
    }/**
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
}
