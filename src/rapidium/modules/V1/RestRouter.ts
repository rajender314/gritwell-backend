import * as express from 'express';

import { AdminRouter } from '@basePath/Admin/Http/Routes/AdminRouter';
import { RecommendationRouter }
  from '@basePath/Admin/Http/Routes/RecommendationRouter';
import { HypothesisRouter } from '@basePath/Admin/Http/Routes/HypothesisRouter';
import { ImportRecommendationRouter }
  from '@basePath/Imports/Http/Routes/ImportRecommendationRouter';
import { ImportHypothesisRouter }
  from '@basePath/Imports/Http/Routes/ImportHypothesisRouter';
import { ExportHypothesisRouter }
  from '@basePath/Exports/Http/Routes/ExportHypothesisRouter';
import { ExportRecommendationRouter }
  from '@basePath/Exports/Http/Routes/ExportRecommendationRouter';
import { UserRouter } from '@basePath/Admin/Http/Routes/UserRouter';
import { ClientsRouter } from '@basePath/OfficeClients/Http/Routes/ClientsRouter';
import { RoleRouter } from '@basePath/Admin/Http/Routes/RoleRouter';
import { PermissionRouter } from '@basePath/Permissions/Http/Routes/PermissionRouter';
import { HealthPlanRouter } from '@basePath/HealthPlan/Http/Routes/HealthPlanRouter';
import { HealthProfileRouter } from '@basePath/HealthProfile/Http/Routes/HealthProfileRouter';
import { AppointmentRouter } from '@basePath/Appointments/Http/Routes/AppointmentRouter';
import { MasterRouter } from '@basePath/Master/Http/Routes/MasterRouter';
import { WebRouter } from '@basePath/Web/Http/Routes/WebRouter';
import { ApiRouter } from '@basePath/Api/Http/Routes/ApiRouter';
import { TypeFormRouter } from '@basePath/Typeforms/Http/Routes/TypeFormRouter';
import { DocumentRouter } from '@basePath/Documents/Http/Routes/DocumentRouter';
import { TodoRouter } from '@basePath/Todos/Http/Routes/TodoRouter';
import { PaymentRouter } from '@basePath/Payments/Http/Routes/PaymentRouter';
import { CustomerRouter } from '@basePath/Customer/Http/Routes/CustomerRouter';
import { SettingsRouter } from '@basePath/Settings/Http/Routes/SettingsRouter';
import { PWARouter } from '@basePath/PWA/Http/Routes/PWARouter';
import {SubscriptionsRouter} from '@basePath/Subscriptions/Http/Routes/SubscriptionsRouter';
import {AcuityRouter} from '@basePath/Acuity/Http/Routes/AcuityRouter';
const RestRouter = express.Router();

RestRouter.use('/office/', AdminRouter);
RestRouter.use('/office/', RecommendationRouter);
RestRouter.use('/office/', ImportRecommendationRouter);
RestRouter.use('/office/', ExportRecommendationRouter);
RestRouter.use('/office/', HypothesisRouter);
RestRouter.use('/office/', ImportHypothesisRouter);
RestRouter.use('/office/', ExportHypothesisRouter);
RestRouter.use('/office/', UserRouter);
RestRouter.use('/office/', ClientsRouter);
RestRouter.use('/office/', RoleRouter);
RestRouter.use('/office/', PermissionRouter);
RestRouter.use('/office/', DocumentRouter);
RestRouter.use('/office/', TodoRouter);
RestRouter.use('/office/', PaymentRouter);
RestRouter.use('/office/', HealthPlanRouter);
RestRouter.use('/office/', HealthProfileRouter);
RestRouter.use('/office/', AppointmentRouter);
RestRouter.use('/office/', MasterRouter);
RestRouter.use('/', WebRouter);
RestRouter.use('/client/', CustomerRouter);

RestRouter.use('/api/', ApiRouter);
RestRouter.use('/api/', TypeFormRouter);
RestRouter.use('/api/settings/', SettingsRouter);
RestRouter.use('/mobile/', PWARouter);
RestRouter.use('/mobile/', SubscriptionsRouter);
RestRouter.use('/mobile/', AcuityRouter);

export { RestRouter };
