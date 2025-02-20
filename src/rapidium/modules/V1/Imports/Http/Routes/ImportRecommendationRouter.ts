import * as express from 'express';
import ImportRecommendationController
  from '@basePath/Imports/Http/Controller/ImportRecommendationController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const importRecommendationController = new ImportRecommendationController();
const middlewareFactory = new MiddlewareFactory();
const ImportRecommendationRouter = express.Router();

ImportRecommendationRouter.route('/uploadNutrition').post(
    middlewareFactory.verifyRole,
    importRecommendationController.uploadNutrition,
);

ImportRecommendationRouter.route('/uploadLifeSytle').post(
    middlewareFactory.verifyRole,
    importRecommendationController.uploadLifeSytle,
);

ImportRecommendationRouter.route('/uploadSupplement').post(
    middlewareFactory.verifyRole,
    importRecommendationController.uploadSupplement,
);

ImportRecommendationRouter.route('/uploadTest').post(
    middlewareFactory.verifyRole,
    importRecommendationController.uploadTest,
);

export {ImportRecommendationRouter};
