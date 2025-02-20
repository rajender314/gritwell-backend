import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';

import {PWALandingPages} from '@basePath/PWA/Commands/PWALandingPages';
import {SubscriptionPlans} from '@basePath/PWA/Commands/SubscriptionPlans';
import {PwaSignInDocs} from '@basePath/PWA/Commands/PwaSignInDocs';
/**
 * Controller class for PWAController
 */
export default class PWAController extends BaseController {
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async pwaLandingPages(req: Request, res: Response, next: any) {
    const pwaLandingPagesCommand = new PWALandingPages(req);
    req.body.sync_type = 'pwa_landingPages';
    await new BaseController().run(
        pwaLandingPagesCommand.path,
        pwaLandingPagesCommand,
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
  async subscriptionPlans(req: Request, res: Response, next: any) {
    const subscriptionPlansCommand = new SubscriptionPlans(req);
    req.body.sync_type = 'pwa_healthPlans';
    await new BaseController().run(
        subscriptionPlansCommand.path,
        subscriptionPlansCommand,
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
  async pwaSignInDocs(req: Request, res: Response, next: any) {
    const pwaSignInDocsCommand = new PwaSignInDocs(req);
    req.body.sync_type = 'pwa_signInDocs';
    await new BaseController().run(
        pwaSignInDocsCommand.path,
        pwaSignInDocsCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
}
