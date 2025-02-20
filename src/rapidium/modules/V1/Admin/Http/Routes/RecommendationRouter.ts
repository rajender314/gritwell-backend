import * as express from 'express';
import RecommendationController
  from '@basePath/Admin/Http/Controller/RecommendationController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const recommendationController = new RecommendationController();
const middlewareFactory = new MiddlewareFactory();
const RecommendationRouter = express.Router();

RecommendationRouter.route('/nutrition').get(
    middlewareFactory.verifyRole,
    recommendationController.getNutritions,
);

RecommendationRouter.route('/nutrition/:id').get(
    middlewareFactory.verifyRole,
    recommendationController.getNutrition,
);

RecommendationRouter.route('/nutrition').post(
    middlewareFactory.verifyRole,
    recommendationController.createNutrition,
);

RecommendationRouter.route('/nutrition/:id').put(
    middlewareFactory.verifyRole,
    recommendationController.updateNutrition,
);

RecommendationRouter.route('/delete-nutrition').post(
    middlewareFactory.verifyRole,
    recommendationController.deleteNutrition,
);

RecommendationRouter.route('/lifestyle').get(
    middlewareFactory.verifyRole,
    recommendationController.getLifeStyles,
);

RecommendationRouter.route('/lifestyle/:id').get(
    middlewareFactory.verifyRole,
    recommendationController.getLifeStyle,
);

RecommendationRouter.route('/lifestyle').post(
    middlewareFactory.verifyRole,
    recommendationController.createLifeStyle,
);

RecommendationRouter.route('/lifestyle/:id').put(
    middlewareFactory.verifyRole,
    recommendationController.updateLifeStyle,
);

RecommendationRouter.route('/delete-lifestyle').post(
    middlewareFactory.verifyRole,
    recommendationController.deleteLifeStyle,
);

RecommendationRouter.route('/supplement').get(
    middlewareFactory.verifyRole,
    recommendationController.getSupplements,
);

RecommendationRouter.route('/supplement/:id').get(
    middlewareFactory.verifyRole,
    recommendationController.getSupplement,
);

RecommendationRouter.route('/supplement').post(
    middlewareFactory.verifyRole,
    recommendationController.createSupplement,
);

RecommendationRouter.route('/supplement/:id').put(
    middlewareFactory.verifyRole,
    recommendationController.updateSupplement,
);

RecommendationRouter.route('/delete-supplement').post(
    middlewareFactory.verifyRole,
    recommendationController.deleteSupplement,
);

RecommendationRouter.route('/test').get(
    middlewareFactory.verifyRole,
    recommendationController.getTests,
);

RecommendationRouter.route('/test/:id').get(
    middlewareFactory.verifyRole,
    recommendationController.getTest,
);

RecommendationRouter.route('/test').post(
    middlewareFactory.verifyRole,
    recommendationController.createTest,
);

RecommendationRouter.route('/test/:id').put(
    middlewareFactory.verifyRole,
    recommendationController.updateTest,
);

RecommendationRouter.route('/delete-test').post(
    middlewareFactory.verifyRole,
    recommendationController.deleteTest,
);

export {RecommendationRouter};
