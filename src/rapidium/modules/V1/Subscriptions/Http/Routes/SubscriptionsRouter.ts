import * as express from 'express';
import SubscriptionsController
  from '@basePath/Subscriptions/Http/Controller/SubscriptionsController';

import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const subscriptionsController = new SubscriptionsController();
const SubscriptionsRouter = express.Router();
const middlewareFactory = new MiddlewareFactory();

SubscriptionsRouter.route('/clients/subscription').post(
    middlewareFactory.verifyAuthorizationToken,
    subscriptionsController.clientSubscription,
);

SubscriptionsRouter.route('/clients/pauseSubscription').post(
    middlewareFactory.verifyAuthorizationToken,
    subscriptionsController.clientPauseSubscription,
);
SubscriptionsRouter.route('/clients/unPausingSubscription').post(
    middlewareFactory.verifyAuthorizationToken,
    subscriptionsController.clientResumeSubscription,
);

SubscriptionsRouter.route('/clients/cancelSubscription').post(
    middlewareFactory.verifyAuthorizationToken,
    subscriptionsController.clientCancelSubscription,
);

SubscriptionsRouter.route('/createPaymentInfo').get(
    middlewareFactory.verifyAuthorizationToken,
    subscriptionsController.createPaymentInfo,
);

SubscriptionsRouter.route('/stripeWebhook').post(
    subscriptionsController.stripeWebhook,
);

SubscriptionsRouter.route('/webFlowStripeWebhook').post(
    subscriptionsController.webFlowStripeWebhook,
);

SubscriptionsRouter.route('/clients/cards').post(
    middlewareFactory.verifyAuthorizationToken,
    subscriptionsController.addCard,
);

SubscriptionsRouter.route('/clients/cards').get(
    middlewareFactory.verifyAuthorizationToken,
    subscriptionsController.getCards,
);

SubscriptionsRouter.route('/clients/updateDefaultCard').put(
    middlewareFactory.verifyAuthorizationToken,
    subscriptionsController.updateDefaultCard,
);


export {SubscriptionsRouter};
