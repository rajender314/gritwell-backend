import * as express from 'express';
import ClientsController
  from '@basePath/OfficeClients/Http/Controller/ClientsController';
import {MiddlewareFactory}
  from '@src/rapidium-core/src/Helpers/MiddlewareFactory';
// import multer from 'multer';

const clientsController = new ClientsController();
const middlewareFactory = new MiddlewareFactory();
const ClientsRouter = express.Router();

ClientsRouter.route('/clients').get(
    // middlewareController.verifyRole,
    middlewareFactory.verifyRole,
    clientsController.getClients,
);

ClientsRouter.route('/clients/:id').get(
    middlewareFactory.verifyRole,
    clientsController.getClientDetails,
);

ClientsRouter.route('/clients/:id').put(
    middlewareFactory.verifyRole,
    clientsController.updateClient,
);

ClientsRouter.route('/users/role/:slug').get(
    middlewareFactory.verifyRole,
    clientsController.getRoleUsersBySlug,
);

ClientsRouter.route('/clients/assignment').post(
    middlewareFactory.verifyRole,
    clientsController.clientAssignment,
); 

ClientsRouter.route('/clients/historical_tests/:id').get(
    middlewareFactory.verifyRole,
    clientsController.historicalTests,
);

ClientsRouter.route('/clients/notes/:id').get(
    middlewareFactory.verifyRole,
    clientsController.clientNotes,
);

ClientsRouter.route('/clients/notes').post(
    middlewareFactory.verifyRole,
    clientsController.createClientNotes,
);

// ClientsRouter.route('/clients/appointments/:id').get(
//     middlewareFactory.verifyRole,
//     clientsController.clientAppointments,
// );

ClientsRouter.route('/clients/recentActivities/:id').get(
    middlewareFactory.verifyRole,
    clientsController.clientRecentActivities,
);

export {ClientsRouter};
