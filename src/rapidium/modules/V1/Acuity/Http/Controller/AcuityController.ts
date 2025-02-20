import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';

import {SyncAcuityAppointments}
  from '@basePath/Acuity/Commands/SyncAcuityAppointments';

const environment = process.env;
const crypto = require('crypto');
/**
 * class AcuityController
 */
export default class AcuityController extends BaseController {
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async syncAcuityAppointments(req: Request, res: Response, next:any) {
    // signature verifying
    // const hasher = crypto.createHmac('sha256', environment.ACUITY_API_KEY);
    // hasher.update(req.body.toString());
    // const hash = hasher.digest('base64');

    // // Compare hash to Acuity signature:
    // if (hash !== req.header('X-Acuity-Signature')) {
    //   // throw new Error('This message was forged!');
    //   res
    //       .status(401)
    //       .send({
    //         status: false,
    //         status_code: 401,
    //         message: 'This message was forged!',
    //       });
    // }

    const syncAcuityAppointmentsCommand = new SyncAcuityAppointments(req);
    await new BaseController().run(
        syncAcuityAppointmentsCommand.path,
        syncAcuityAppointmentsCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
}
