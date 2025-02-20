import * as express from 'express';
import HealthPlanController
    from '@basePath/HealthPlan/Http/Controller/HealthPlanController';
import { MiddlewareFactory }
    from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const healthPlanController = new HealthPlanController();
const middlewareFactory = new MiddlewareFactory();
const HealthPlanRouter = express.Router();

// HealthPlanRouter.route('/clients/healthplan').post(
//     middlewareFactory.verifyRole,
//     healthPlanController.createActivePlan
// );
 
HealthPlanRouter.route('/clients/healthplan/:client_id').put(
    middlewareFactory.verifyRole,
    healthPlanController.editHealthPlan
);

HealthPlanRouter.route('/clients/edit-healthplan/:type/:health_plan_row_id').put(
    middlewareFactory.verifyRole,
    healthPlanController.editInlineStatus
);

HealthPlanRouter.route('/clients/healthplan/submit').post(
    middlewareFactory.verifyRole,
    healthPlanController.submitHealthPlan
);

HealthPlanRouter.route('/clients/healthplan/:type/:id').delete(
    middlewareFactory.verifyRole,
    healthPlanController.delete
);

HealthPlanRouter.route('/clients/healthplan/frequencies').get(
    middlewareFactory.verifyRole,
    healthPlanController.healthPlanFrequencies
);

HealthPlanRouter.route('/clients/healthplan/units').get(
    middlewareFactory.verifyRole,
    healthPlanController.healthPlanUnits
);

HealthPlanRouter.route('/clients/healthplan/statuses/:type').get(
    middlewareFactory.verifyRole,
    healthPlanController.healthPlanStatuses
);

HealthPlanRouter.route('/clients/healthplan/:type/:client_id/:health_plan_id').get(
    middlewareFactory.verifyRole,
    healthPlanController.get
);

HealthPlanRouter.route('/clients/healthplan/:client_id/:health_plan_id').get(
    middlewareFactory.verifyRole,
    healthPlanController.getHealthPlanDetails
);

HealthPlanRouter.route('/clients/healthplan/:type').post(
    middlewareFactory.verifyRole,
    healthPlanController.create
);



export { HealthPlanRouter };
