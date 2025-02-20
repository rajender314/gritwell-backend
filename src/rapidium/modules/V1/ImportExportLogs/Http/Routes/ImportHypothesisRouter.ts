import * as express from 'express';
import ImportExportLogController
  from '@basePath/ImportExportLogs/Http/Controller/ImportExportLogController';
import { MiddlewareFactory }
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const importExportLogController = new ImportExportLogController();
const middlewareFactory = new MiddlewareFactory();
const ImportExportLogRouter = express.Router();

ImportExportLogRouter.route('/importExportLog').post(
  middlewareFactory.verifyRole,
  importExportLogController.saveImportExportLog,
); 

ImportExportLogRouter.route('/importExportLog').get(
  middlewareFactory.verifyRole,
  importExportLogController.getImportExportLogs,
); 

export { ImportExportLogRouter };
