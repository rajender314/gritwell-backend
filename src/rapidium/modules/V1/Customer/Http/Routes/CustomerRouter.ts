import * as express from 'express';
import CustomerController
  from '@basePath/Customer/Http/Controller/CustomerController';

// import MiddlewareController
// from '@basePath/Middleware/Http/Controller/MiddlewareController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const customerController = new CustomerController();

// const middlewareController = new MiddlewareController();
const middlewareFactory = new MiddlewareFactory();
const CustomerRouter = express.Router();

CustomerRouter.route('/user').get(
    middlewareFactory.verifyRole,
    customerController.getCustomer,
);
CustomerRouter.route('/user/:id').get(
    middlewareFactory.verifyRole,
    customerController.getCustomer,
);

CustomerRouter.route('/user').post(
    middlewareFactory.verifyRole,
    customerController.addCustomer,
);

CustomerRouter.route('/user').put(
    middlewareFactory.verifyRole,
    customerController.editCustomer,
);
CustomerRouter.route('/uploadProfilePic').post(
    customerController.uploadProfilePic,
);


CustomerRouter.route('/clientUser/:id').get(
    middlewareFactory.verifyRole,
    customerController.getCustomer,
);
CustomerRouter.route('/clientUser').post(
    middlewareFactory.checkGuestToken,
    customerController.appSignUpCustomer,
);
CustomerRouter.route('/clientUser').put(
    middlewareFactory.verifyRole,
    customerController.editCustomer,
);

CustomerRouter.route('/reSendEmailVerification').post(
    middlewareFactory.checkGuestToken,
    customerController.reSendEmailVerification,
);
CustomerRouter.route('/appointments').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.appointments,
);

CustomerRouter.route('/validateAppointment').post(
    middlewareFactory.verifyAuthorizationToken,
    customerController.validateAppointment,
);

CustomerRouter.route('/appointmentPayment').post(
    middlewareFactory.verifyAuthorizationToken,
    customerController.appointmentPayment,
);

CustomerRouter.route('/intakeForm').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.intakeForm,
);
CustomerRouter.route('/symptomAnalysis').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.symptomAnalysis,
);

CustomerRouter.route('/myPhasesOfCare').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.myPhasesOfCare,
);

CustomerRouter.route('/myPaymentHistory').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.myPaymentHistory,
);
CustomerRouter.route('/downloadPaymentHistory').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.downloadPaymentHistory,
);
CustomerRouter.route('/payment/:id').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.getPaymentDetails,
);
CustomerRouter.route('/downloadPaymentDetails/:id').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.downloadPaymentDetails,
);

CustomerRouter.route('/downloadIntakeForm').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.downloadIntakeForm,
);
CustomerRouter.route('/downloadSymptomAnalysis').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.downloadSymptomAnalysis,
);
CustomerRouter.route('/customerStats').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.customerStats,
);

CustomerRouter.route('/myhealthPlan').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.myhealthPlan,
);
CustomerRouter.route('/myhealthPlanMarkasComplete').post(
    middlewareFactory.verifyAuthorizationToken,
    customerController.myhealthPlanMarkasComplete,
);
CustomerRouter.route('/undoDailyGoalMarkasComplete/:id').delete(
    middlewareFactory.verifyAuthorizationToken,
    customerController.undoDailyGoalMarkasComplete,
);
CustomerRouter.route('/myhealthPlanItemasViewed').post(
    middlewareFactory.verifyAuthorizationToken,
    customerController.myhealthPlanItemasViewed,
);

CustomerRouter.route('/myTests').get(
    middlewareFactory.verifyAuthorizationToken,
    customerController.myTests,
);

export {CustomerRouter};
