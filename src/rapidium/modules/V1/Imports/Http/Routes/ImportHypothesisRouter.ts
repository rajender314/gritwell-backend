import * as express from 'express';
import ImportHypothesisController
  from '@basePath/Imports/Http/Controller/ImportHypothesisController';
import { MiddlewareFactory }
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const importHypothesisController = new ImportHypothesisController();
const middlewareFactory = new MiddlewareFactory();
const ImportHypothesisRouter = express.Router();

ImportHypothesisRouter.route('/uploadGoal').post(
  middlewareFactory.verifyRole,
  importHypothesisController.uploadGoal,
);

ImportHypothesisRouter.route('/uploadDiagnosis').post(
  middlewareFactory.verifyRole,
  importHypothesisController.uploadDiagnosis,
);

ImportHypothesisRouter.route('/uploadRootCause').post(
  middlewareFactory.verifyRole,
  importHypothesisController.uploadRootCause,
);

ImportHypothesisRouter.route('/uploadCoreDysfunction').post(
  middlewareFactory.verifyRole,
  importHypothesisController.uploadCoreDysfunction,
);

export { ImportHypothesisRouter };
