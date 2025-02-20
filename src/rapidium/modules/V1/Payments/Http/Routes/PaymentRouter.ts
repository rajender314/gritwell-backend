import * as express from 'express';
import PaymentController
    from '@basePath/Payments/Http/Controller/PaymentController';
import { MiddlewareFactory }
    from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const paymentController = new PaymentController();
const middlewareFactory = new MiddlewareFactory();
const PaymentRouter = express.Router();


PaymentRouter.route('/clients/payments/:client_id').get(
    middlewareFactory.verifyRole,
    paymentController.clientPayments,
);

PaymentRouter.route('/clients/payment/:payment_id').get(
    middlewareFactory.verifyRole,
    paymentController.getPayment,
);

PaymentRouter.route('/myPayments').get(
    middlewareFactory.verifyRole,
    paymentController.myPayments,
);


PaymentRouter.route('/paymentStatuses').get(
    middlewareFactory.verifyRole,
    paymentController.paymentStatuses,
);

export { PaymentRouter };
