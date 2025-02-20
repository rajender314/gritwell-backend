import * as express from 'express';

import UsersController
  from '@basePath/Admin/Http/Controller/UsersController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const usersController = new UsersController();
const middlewareFactory = new MiddlewareFactory();

const UserRouter = express.Router();

UserRouter.route('/users').get(
    middlewareFactory.verifyRole,
    usersController.getUsers,
);

UserRouter.route('/users').post(
    middlewareFactory.verifyRole,
    usersController.createUser,
);

UserRouter.route('/users/:id').get(
    middlewareFactory.verifyRole,
    usersController.getUserDetails,
);

UserRouter.route('/users/:id').put(
    middlewareFactory.verifyRole,
    usersController.updateUser,
);

UserRouter.route('/profilePicture/:id').delete(
    middlewareFactory.verifyRole,
    usersController.deleteProfilePicture,
);

export {UserRouter};
