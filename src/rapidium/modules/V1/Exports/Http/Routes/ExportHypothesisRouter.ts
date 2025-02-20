import * as express from 'express';
import ExportHypothesisController
    from '@basePath/Exports/Http/Controller/ExportHypothesisController';

const exportHypothesisController = new ExportHypothesisController();
const ExportHypothesisRouter = express.Router();

ExportHypothesisRouter.route('/downloadGoal').get(
    exportHypothesisController.verifyToken,
    exportHypothesisController.downloadGoal,
);

ExportHypothesisRouter.route('/downloadDiagnosis').get(
    exportHypothesisController.verifyToken,
    exportHypothesisController.downloadDiagnosis,
);

ExportHypothesisRouter.route('/downloadRootCause').get(
    exportHypothesisController.verifyToken,
    exportHypothesisController.downloadRootCause,
);

ExportHypothesisRouter.route('/downloadCoreDysfunction').get(
    exportHypothesisController.verifyToken,
    exportHypothesisController.downloadCoreDysfunction,
);

export { ExportHypothesisRouter };
