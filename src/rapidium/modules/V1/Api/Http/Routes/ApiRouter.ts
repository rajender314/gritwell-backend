import * as express from 'express';
import ApiController from '@basePath/Api/Http/Controller/ApiController';

const apiController = new ApiController();
const ApiRouter = express.Router();

ApiRouter.route('/syncTypeForms').get(
    apiController.syncTypeForms,
);

// ApiRouter.route("/syncTypeFormQuestions").get(
//   apiController.syncTypeFormQuestions
// );

ApiRouter.route('/syncTypeFormResponse').post(
    apiController.syncTypeFormResponse,
);


ApiRouter.route('/syncSetConsent').post(
    apiController.syncSetConsent,
);

ApiRouter.route('/syncSetMsqConsent').post(
    apiController.syncSetMsqConsent,
);

export {ApiRouter};
