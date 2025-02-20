import * as express from 'express';
import HypothesisController
  from '@basePath/Admin/Http/Controller/HypothesisController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const hypothesisController = new HypothesisController();
const middlewareFactory = new MiddlewareFactory();
const HypothesisRouter = express.Router();


HypothesisRouter.route('/goal').post(
    middlewareFactory.verifyRole,
    hypothesisController.createGoal,
);

HypothesisRouter.route('/goal/:id').get(
    middlewareFactory.verifyRole,
    hypothesisController.getGoal,
);

HypothesisRouter.route('/goal').get(
    middlewareFactory.verifyRole,
    hypothesisController.getGoals,
);

HypothesisRouter.route('/goal/:id').put(
    middlewareFactory.verifyRole,
    hypothesisController.updateGoal,
);

HypothesisRouter.route('/diagnosis').post(
    middlewareFactory.verifyRole,
    hypothesisController.createDiagnosis,
);

HypothesisRouter.route('/diagnosis/:id').get(
    middlewareFactory.verifyRole,
    hypothesisController.getDiagnosis,
);

HypothesisRouter.route('/diagnosis').get(
    middlewareFactory.verifyRole,
    hypothesisController.getDiagnosises,
);

HypothesisRouter.route('/diagnosis/:id').put(
    middlewareFactory.verifyRole,
    hypothesisController.updateDiagnosis,
);

HypothesisRouter.route('/rootCause').post(
    middlewareFactory.verifyRole,
    hypothesisController.createRootCause,
);

HypothesisRouter.route('/rootCause/:id').get(
    middlewareFactory.verifyRole,
    hypothesisController.getRootCause,
);

HypothesisRouter.route('/rootCause').get(
    middlewareFactory.verifyRole,
    hypothesisController.getRootCauses,
);

HypothesisRouter.route('/rootCause/:id').put(
    middlewareFactory.verifyRole,
    hypothesisController.updateRootCause,
);

HypothesisRouter.route('/coreDysfunction').post(
    middlewareFactory.verifyRole,
    hypothesisController.createCoreDysfunction,
);

HypothesisRouter.route('/coreDysfunction/:id').get(
    middlewareFactory.verifyRole,
    hypothesisController.getCoreDysfunction,
);

HypothesisRouter.route('/coreDysfunction').get(
    middlewareFactory.verifyRole,
    hypothesisController.getCoreDysfunctions,
);

HypothesisRouter.route('/coreDysfunction/:id').put(
    middlewareFactory.verifyRole,
    hypothesisController.updateCoreDysfunction,
);

export {HypothesisRouter};

