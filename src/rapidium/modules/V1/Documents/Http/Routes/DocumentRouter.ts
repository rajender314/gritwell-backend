import * as express from 'express';
import DocumentController
    from '@basePath/Documents/Http/Controller/DocumentController';
import { MiddlewareFactory }
    from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const documentController = new DocumentController();
const middlewareFactory = new MiddlewareFactory();
const DocumentRouter = express.Router();


DocumentRouter.route('/clients/documents/:client_id').get(
    middlewareFactory.verifyRole,
    documentController.listDocuments,
);

DocumentRouter.route('/clients/document/:type_form_id/:client_id/:form_response_id').get(
    middlewareFactory.verifyRole,
    documentController.getDocument,
);

export { DocumentRouter };
