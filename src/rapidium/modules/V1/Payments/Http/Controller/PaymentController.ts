import { Request, Response } from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import { ClientPayments } from '@basePath/Payments/Commands/ClientPayments';
import { GetPayment } from '@basePath/Payments/Commands/GetPayment';
import { AdminPayments } from '@basePath/Payments/Commands/AdminPayments';
import { PaymentStatusesSchema }
    from '@basePath/Subscriptions/DataSource/Models/Schema/PaymentStatusesSchema';
import { SubscriptionPlansSchema } from '@basePath/PWA/DataSource/Models/Schema/SubscriptionPlans'
/**
 * class PaymentController
 */
export default class PaymentController extends BaseController {
    /**
     * @param {req} req
     * @param {res} res
     * @param {next} next
     */
    async clientPayments(req: Request, res: Response, next: any) {
        const getCommand = new ClientPayments(req);
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
    async getPayment(req: Request, res: Response, next: any) {
        const getCommand = new GetPayment(req);
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
    async myPayments(req: Request, res: Response, next: any) {
        const getCommand = new AdminPayments(req);
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
    async paymentStatuses(req: Request, res: Response, next: any) {
        const statuses = await PaymentStatusesSchema.find({}, {
            _id: 1,
            value: '$_id',
            label: '$name',
            code: 1,
            color: 1
        });
        const plans = await SubscriptionPlansSchema.find({}, {
            _id: 1,
            plan_type: 1
        });
        res.json({
            status: true,
            data: { result: { statuses, plans } }, status_code: 200,
            message: "Successful"
        });
    }
}
