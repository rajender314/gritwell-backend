import * as express from 'express';
import ExportRecommendationController
  from '@basePath/Exports/Http/Controller/ExportRecommendationController';

const exportRecommendationController = new ExportRecommendationController();
const ExportRecommendationRouter = express.Router();

ExportRecommendationRouter.route('/downloadNutrition').get(
    exportRecommendationController.verifyToken,
    exportRecommendationController.downloadNutrition,
);

ExportRecommendationRouter.route('/downloadLifeStyle').get(
    exportRecommendationController.verifyToken,
    exportRecommendationController.downloadLifeStyle,
);

ExportRecommendationRouter.route('/downloadSupplement').get(
    exportRecommendationController.verifyToken,
    exportRecommendationController.downloadSupplement,
);

ExportRecommendationRouter.route('/downloadTest').get(
    exportRecommendationController.verifyToken,
    exportRecommendationController.downloadTest,
);

export {ExportRecommendationRouter};
