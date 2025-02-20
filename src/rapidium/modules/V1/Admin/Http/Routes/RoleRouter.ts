import * as express from 'express';

import RolesController
  from '@basePath/Admin/Http/Controller/RolesController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const rolesController = new RolesController();
const middlewareFactory = new MiddlewareFactory();

const RoleRouter = express.Router();

RoleRouter.route('/roles').get(
    middlewareFactory.verifyRole,
    rolesController.getRoles,
);

RoleRouter.route('/roles/:id').get(
    middlewareFactory.verifyRole,
    rolesController.getRoleDetails,
);

RoleRouter.route('/roles/:id').put(
    middlewareFactory.verifyRole,
    rolesController.updateRole,
);

export {RoleRouter};
