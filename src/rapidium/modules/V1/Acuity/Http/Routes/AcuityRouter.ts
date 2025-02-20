import * as express from 'express';
import AcuityController
  from
  '@basePath/Acuity/Http/Controller/AcuityController';
const acuityController = new AcuityController();
const AcuityRouter = express.Router();


AcuityRouter.route('/syncAcuityAppointments').post(
    acuityController.syncAcuityAppointments,
);


export {AcuityRouter};


