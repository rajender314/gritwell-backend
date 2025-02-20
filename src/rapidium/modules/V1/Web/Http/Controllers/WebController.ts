import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {Login} from '@basePath/Web/Commands/Login';
import {ForgotPassword} from '@basePath/Web/Commands/ForgotPassword';
import {ForgotToken} from '@basePath/Web/Commands/ForgotToken';
import {ResetPassword} from '@basePath/Web/Commands/ResetPassword';
import {ChangePassword} from '@basePath/Web/Commands/ChangePassword';
import {UserProfile} from '@basePath/Web/Commands/UserProfile';
import {UpdateUserProfile} from '@basePath/Web/Commands/UpdateUserProfile';
import {DeleteUserProfilePic}
  from '@basePath/Web/Commands/DeleteUserProfilePic';
import {TextlineIntegration}
  from '@basePath/Web/Commands/TextlineIntegration';


import {AdminResetPassword} from '@basePath/Web/Commands/AdminResetPassword';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';
// import {env} from 'process';

const environment = process.env;
// var OAuth2Server = require('oauth2-server'),
// Request = OAuth2Server.Request,
// Response = OAuth2Server.Response;
// require("dotenv").config();
// let env = process.env;
// const tokenTime:any = process.env.TOKEN_TIME || 2;
/**
 * class WebController
 */
export default class WebController extends BaseController {
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async guestLogin(req, res) {
    const middlewareFactory = new MiddlewareFactory();
    return middlewareFactory.generateGuestToken(req, res);
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async login(req, res) {
    req.body.user_type = 1;
    const middlewareFactory = new MiddlewareFactory();
    return middlewareFactory.generateToken(req, res);
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async clientLogin(req, res) {
    req.body.user_type = 2;
    const middlewareFactory = new MiddlewareFactory();
    return middlewareFactory.generateToken(req, res);
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async autoLogin(req, res) {
    req.body.user_type = 2;
    const middlewareFactory = new MiddlewareFactory();
    return middlewareFactory.signupGenearateToken(req, res);
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async login_jwt(req: Request, res: Response, next: any) {
    const loginCommand = new Login(req);
    await new BaseController().run(
        loginCommand.path,
        loginCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async forgotPassword(req: Request, res: Response, next: any) {
    const forgotPasswordCommand = new ForgotPassword(req);
    await new BaseController().run(
        forgotPasswordCommand.path,
        forgotPasswordCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async verifyForgotToken(req: Request, res: Response, next: any) {
    const verifyForgotTokenCommand = new ForgotToken(req);
    await new BaseController().run(
        verifyForgotTokenCommand.path,
        verifyForgotTokenCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async resetPassword(req: Request, res: Response, next: any) {
    const resetPasswordCommand = new ResetPassword(req);
    await new BaseController().run(
        resetPasswordCommand.path,
        resetPasswordCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async changePassword(req: Request, res: Response, next: any) {
    const changePasswordCommand = new ChangePassword(req);
    await new BaseController().run(
        changePasswordCommand.path,
        changePasswordCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async logout(req: Request, res: Response, next: any) {
    const middlewareFactory = new MiddlewareFactory();
    return middlewareFactory.logout(req, res);
  }
  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async adminResetPassword(req: Request, res: Response, next: any) {
    const adminResetPasswordCommand = new AdminResetPassword(req);
    await new BaseController().run(
        adminResetPasswordCommand.path,
        adminResetPasswordCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async userProfile(req: Request, res: Response, next: any) {
    const userProfileCommand = new UserProfile(req);
    await new BaseController().run(
        userProfileCommand.path,
        userProfileCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async updateUserProfile(req: Request, res: Response, next: any) {
    const userProfileCommand = new UpdateUserProfile(req);
    await new BaseController().run(
        userProfileCommand.path,
        userProfileCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async deleteUserProfilePic(req: Request, res: Response, next: any) {
    const userProfileCommand = new DeleteUserProfilePic(req);
    await new BaseController().run(
        userProfileCommand.path,
        userProfileCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async textline(req: Request, res: Response, next: any) {
    const textlineCommand = new TextlineIntegration(req);
    await new BaseController().run(
        textlineCommand.path,
        textlineCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   */
  async configList(req: Request, res: Response, next: any) {
    const configParams = {
      stripeSecretKey: environment.STRIPE_SECRET_KEY,
      stripePublishabletKey: environment.STRIPE_PUBLISHABLE_KEY,
      typeFormHealthAssesmentId: environment.TYPE_FORM_HEALTH_ASSESSMENT,
      typeFormHealthAssesmentTitle: 'Health Assesment',
      typeFormIntakeId: environment.TYPE_FORM_INTAKE,
      typeFormIntakeTitle: 'Intake Form',
      typeFormSymptomAnalysisId: environment.TYPE_FORM_SYMPTOM_ANALYSIS,
      typeFormSymptomAnalysisTitle: 'Symptom Analysis',
      typeFormPreAppointmentId: environment.TYPE_FORM_PRE_APPOINTMENT,
      typeFormPreAppointmentTitle: 'Pre Check In',
      typeFormPostAppointmentId: environment.TYPE_FORM_POST_APPOINTMENT,
      typeFormPostAppointmentTitle: 'Post Check In',
      typeFormClientHappinessId: environment.TYPE_FORM_CLIENT_HAPPINESS,
      typeFormClientHappinessTitle: 'Client Happiness Form',
    };
    res.json({
      status: true,
      data: {result: configParams},
      status_code: 200,
      message: 'Successful',
    });
  }
}
