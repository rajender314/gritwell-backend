import * as express from 'express';
import PWAController from '@basePath/PWA/Http/Controller/PWAController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const pwaController = new PWAController();
const PWARouter = express.Router();
const middlewareFactory = new MiddlewareFactory();

PWARouter.route('/pwaLandingPages').get(
    middlewareFactory.checkGuestToken,
    pwaController.pwaLandingPages,
);
PWARouter.route('/plans/:slug').get(
    middlewareFactory.checkGuestToken,
    pwaController.subscriptionPlans,
);

PWARouter.route('/pwasignInDocs').get(
    // middlewareFactory.checkGuestToken,
    pwaController.pwaSignInDocs,
);

export {PWARouter};
