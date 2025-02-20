import * as express from 'express';
import SettingsController
  from '@basePath/Settings/Http/Controller/SettingsController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const settingController = new SettingsController();
const middlewareFactory = new MiddlewareFactory();
const SettingsRouter = express.Router();


/**
 * Email Controller List
 *
 */
SettingsRouter.route('/emailControllerList').get(
    middlewareFactory.verifyRole,
    settingController.emailControllerList,
);

/**
 * Stop Outgoing Emails on/off
 *
 */
SettingsRouter.route('/update').post(
    middlewareFactory.verifyRole,
    settingController.updateSettings,
);

export {SettingsRouter};
