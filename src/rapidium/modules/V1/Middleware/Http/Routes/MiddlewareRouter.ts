import * as express from 'express';
// import { verifyOrgUser } from "../../../../../../Middleware";
// import ApiController from "../Controller/MiddlewareController";
import MiddlewareController
  from '@basePath/Middleware/Http/Controller/MiddlewareController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';
// import Recaptcha from 'express-recaptcha'
require('dotenv').config();
// const env = process.env;


const MiddlewareControllerObj = new MiddlewareController();
const middlewareFactore = new MiddlewareFactory();
const MiddlewareRouter = express.Router();


// ApiRouter.route("/verify-otp").post(
//   recaptcha.middleware.verify,
//   apiController.verifyOTP
// );
MiddlewareRouter.route('/oauth/token')
    .post( MiddlewareControllerObj.loginOauth);
MiddlewareRouter.route('/createclient')
    .post(MiddlewareControllerObj.loginOauth);
MiddlewareRouter.route('/checkToken')
    .post(middlewareFactore.checkToken, MiddlewareControllerObj.verifyMe);
// MiddlewareRouter.route('/').post(authenticateRequest, function(req, res) {
//   res.send('Congratulations, you are in a secret area!');
// });

export {MiddlewareRouter};
