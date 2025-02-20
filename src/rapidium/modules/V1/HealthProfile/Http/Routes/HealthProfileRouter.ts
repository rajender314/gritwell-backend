import * as express from 'express';
import HealthProfileController
    from '@basePath/HealthProfile/Http/Controller/HealthProfileController';
import { MiddlewareFactory }
    from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const healthProfileController = new HealthProfileController();
const middlewareFactory = new MiddlewareFactory();
const HealthProfileRouter = express.Router();

HealthProfileRouter.route('/clients/healthprofile/goals/:client_id').get(
    middlewareFactory.verifyRole,
    healthProfileController.getClientGoals
);

HealthProfileRouter.route('/clients/healthprofile/goals').get(
    middlewareFactory.verifyRole,
    healthProfileController.getGoals
);

HealthProfileRouter.route('/clients/healthprofile/goals').post(
    middlewareFactory.verifyRole,
    healthProfileController.createClientGoals
);

HealthProfileRouter.route('/clients/healthprofile/hypothesis').get(
    middlewareFactory.verifyRole,
    healthProfileController.getHypothesis
);


HealthProfileRouter.route('/clients/healthprofile/hypothesis').post(
    middlewareFactory.verifyRole,
    healthProfileController.createClientHypothesis
);

HealthProfileRouter.route('/clients/healthprofile/hypothesis/:client_id').get(
    middlewareFactory.verifyRole,
    healthProfileController.getClientHypothesis
);

HealthProfileRouter.route('/clients/healthprofile/notes/:type/:client_id').get(
    middlewareFactory.verifyRole,
    healthProfileController.getClientNotes
);

HealthProfileRouter.route('/clients/healthprofile/notes').post(
    middlewareFactory.verifyRole,
    healthProfileController.createClientNotes
);
export { HealthProfileRouter };
