import * as express from 'express';
import PermissionController
    from '@basePath/Permissions/Http/Controller/PermissionController';
import { MiddlewareFactory }
    from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const permissionController = new PermissionController();
const middlewareFactory = new MiddlewareFactory();
const PermissionRouter = express.Router();

PermissionRouter.route('/userPermissions').get(
    middlewareFactory.verifyRole,
    permissionController.userPermissions,
);

export { PermissionRouter };
