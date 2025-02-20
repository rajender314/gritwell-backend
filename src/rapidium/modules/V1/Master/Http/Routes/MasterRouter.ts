import * as express from 'express';
import MasterController
  from '@basePath/Master/Http/Controller/MasterController';
import { MiddlewareFactory }
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const masterController = new MasterController();
const middlewareFactory = new MiddlewareFactory();
const MasterRouter = express.Router();

MasterRouter.route('/masters').get(
  middlewareFactory.verifyRole,
  masterController.getMasters,
); 

export { MasterRouter };
