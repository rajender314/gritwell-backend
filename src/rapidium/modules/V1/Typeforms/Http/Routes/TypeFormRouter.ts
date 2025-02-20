import * as express from 'express';
import TypeFormController from '@basePath/Typeforms/Http/Controller/TypeFormController';

const typeFormController = new TypeFormController();
const TypeFormRouter = express.Router();

TypeFormRouter.route('/syncHealthAssessment').post(
    typeFormController.syncHealthAssessment,
);

TypeFormRouter.route('/syncIntake').post(
    typeFormController.syncIntake,
);

TypeFormRouter.route('/syncSymptomAnalysis').post(
    typeFormController.syncSymptomAnalysis,
);

TypeFormRouter.route('/syncAppointmentSurvey').post(
    typeFormController.appointmentSurvey,
); 

TypeFormRouter.route('/syncClientHappiness').post(
    typeFormController.syncClientHappiness,
); 

export { TypeFormRouter };
