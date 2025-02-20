import * as express from 'express';
import AppointmentController
    from '@basePath/Appointments/Http/Controller/AppointmentController';
import { MiddlewareFactory }
    from '@src/rapidium-core/src/Helpers/MiddlewareFactory';

const appointmentController = new AppointmentController();
const middlewareFactory = new MiddlewareFactory();
const AppointmentRouter = express.Router();

AppointmentRouter.route('/clients/appointments/:client_id').get(
    middlewareFactory.verifyRole,
    appointmentController.getClientAppointments,
);

AppointmentRouter.route('/clients/currentAppointment/:client_id').get(
    middlewareFactory.verifyRole,
    appointmentController.getCurrentAppointment,
);

AppointmentRouter.route('/clients/appointments/:id').put(
    middlewareFactory.verifyRole,
    appointmentController.updateAppointment,
);

AppointmentRouter.route('/clients/appointmentNotes/:client_id/:appointment_id').get(
    middlewareFactory.verifyRole,
    appointmentController.getClientAppointmentNotes,
);

AppointmentRouter.route('/clients/appointmentNotes/:appointment_note_id').delete(
    middlewareFactory.verifyRole,
    appointmentController.deleteAppointmentNotes,
);

AppointmentRouter.route('/clients/appointmentNotes').post(
    middlewareFactory.verifyRole,
    appointmentController.createClientAppointmentNotes,
);

AppointmentRouter.route('/mySchedule').get(
    middlewareFactory.verifyRole,
    appointmentController.mySchedule,
);

AppointmentRouter.route('/appointmentStatuses').get(
    middlewareFactory.verifyRole,
    appointmentController.appointmentStatuses,
);
export { AppointmentRouter };
