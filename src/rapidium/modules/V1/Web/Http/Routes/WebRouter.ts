import * as express from 'express';
import WebController from '@basePath/Web/Http/Controllers/WebController';
// import MiddlewareController
// from '@basePath/Middleware/Http/Controller/MiddlewareController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const webController = new WebController();
// const middlewareController = new MiddlewareController();
const middlewareFactory = new MiddlewareFactory();
const WebRouter = express.Router();

WebRouter.route('/login').post(
    webController.login,
);
WebRouter.route('/clientLogin').post(
    webController.clientLogin,
);

WebRouter.route('/autoLogin').post(
    webController.autoLogin,
);

WebRouter.route('/forgotPassword').post(
    // middlewareFactory.checkGuestToken,
    webController.forgotPassword,
);

WebRouter.route('/verifyForgotToken').post(
    // middlewareFactory.checkGuestToken,
    webController.verifyForgotToken,
);

WebRouter.route('/resetPassword').post(
    // middlewareFactory.checkGuestToken,
    webController.resetPassword,
);
WebRouter.route('/changePassword').post(
    middlewareFactory.verifyAuthorizationToken,
    webController.changePassword,
);
WebRouter.route('/logout').post(
    webController.logout,
);

WebRouter.route('/adminResetPassword').post(
    middlewareFactory.verifyRole,
    webController.adminResetPassword,
);

WebRouter.route('/profile').get(
    middlewareFactory.verifyAuthorizationToken,
    webController.userProfile,
);

WebRouter.route('/profile').put(
    middlewareFactory.verifyAuthorizationToken,
    webController.updateUserProfile,
);

WebRouter.route('/profilePicture').delete(
    middlewareFactory.verifyAuthorizationToken,
    webController.deleteUserProfilePic,
);

WebRouter.route('/guestLogin').post(
    webController.guestLogin,
);

WebRouter.route('/textline').post(
    webController.textline,
);

WebRouter.route('/configList').get(
    middlewareFactory.checkGuestToken,
    webController.configList,
);

export {WebRouter};
