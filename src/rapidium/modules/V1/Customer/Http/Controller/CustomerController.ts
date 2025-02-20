import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';
import {AddCustomer} from '@basePath/Customer/Commands/AddCustomer';
import {AppSignUpCustomer} from '@basePath/Customer/Commands/AppSignUpCustomer';
import {GetCustomer} from '@basePath/Customer/Commands/GetCustomer';
import {EditCustomer} from '@basePath/Customer/Commands/EditCustomer';

import {ReSendEmailVerification}
  from '@basePath/Customer/Commands/ReSendEmailVerification';
import {Appointments} from '@basePath/Customer/Commands/Appointments';
import {ValidateAppointment}
  from '@basePath/Customer/Commands/ValidateAppointment';
import {AppointmentPayment}
  from '@basePath/Customer/Commands/AppointmentPayment';
import {IntakeForm} from '@basePath/Customer/Commands/IntakeForm';
import {SymptomAnalysis} from '@basePath/Customer/Commands/SymptomAnalysis';
import {MyPhasesOfCare} from '@basePath/Customer/Commands/MyPhasesOfCare';
import {PaymentHistory} from '@basePath/Customer/Commands/PaymentHistory';
import {DownloadPaymentHistory}
  from '@basePath/Customer/Commands/DownloadPaymentHistory';
import {DownloadIntakeForm}
  from '@basePath/Customer/Commands/DownloadIntakeForm';
import {DownloadSymptomAnalysis}
  from '@basePath/Customer/Commands/DownloadSymptomAnalysis';

import {GetPaymentDetails} from '@basePath/Customer/Commands/GetPaymentDetails';
import {DownloadPaymentDetails}
  from '@basePath/Customer/Commands/DownloadPaymentDetails';
import {CustomerStats} from '@basePath/Customer/Commands/CustomerStats';
import {MyhealthPlan} from '@basePath/Customer/Commands/MyhealthPlan';
import {MyhealthPlanItemMarkasComplete}
  from '@basePath/Customer/Commands/MyhealthPlanItemMarkasComplete';
import {MyhealthPlanItemasViewedCommand}
  from '@basePath/Customer/Commands/MyhealthPlanItemasViewedCommand';
import {UndoDailyGoalMarkasComplete}
  from '@basePath/Customer/Commands/UndoDailyGoalMarkasComplete';
import {MyTests} from '@basePath/Customer/Commands/MyTests';
// import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
// import path from "path";
// import { DeleteUser } from "@basePath/Admin/Commands/DeleteUser";
/**
 * Controller class for CustomerController
 */
export default class CustomerController extends BaseController {
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async addCustomer(req: Request, res: Response, next: any) {
    const addCommand = new AddCustomer(req);
    await new BaseController().run(
        addCommand.path,
        addCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async appSignUpCustomer(req: Request, res: Response, next: any) {
    req.body.req_type = 'clientUser';
    req.body.status = true;
    const appSignUpCustomerCommand = new AppSignUpCustomer(req);
    await new BaseController().run(
        appSignUpCustomerCommand.path,
        appSignUpCustomerCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async getCustomer(req: Request, res: Response, next: any) {
    const getCommand = new GetCustomer(req);
    await new BaseController().run(
        getCommand.path,
        getCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async editCustomer(req: Request, res: Response, next: any) {
    const addCommand = new EditCustomer(req);
    await new BaseController().run(
        addCommand.path,
        addCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async uploadProfilePic(req: Request, res: Response, next: any) {
    return true;
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async reSendEmailVerification(req: Request, res: Response, next: any) {
    const reSendEmailVerificationCommand = new ReSendEmailVerification(req);
    await new BaseController().run(
        reSendEmailVerificationCommand.path,
        reSendEmailVerificationCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async appointments(req: Request, res: Response, next: any) {
    const appointmentsCommand = new Appointments(req);
    await new BaseController().run(
        appointmentsCommand.path,
        appointmentsCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }


  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async validateAppointment(req: Request, res: Response, next: any) {
    const validateAppointmentCommand = new ValidateAppointment(req);
    await new BaseController().run(
        validateAppointmentCommand.path,
        validateAppointmentCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async appointmentPayment(req: Request, res: Response, next: any) {
    const appointmentPaymentCommand = new AppointmentPayment(req);
    await new BaseController().run(
        appointmentPaymentCommand.path,
        appointmentPaymentCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async intakeForm(req: Request, res: Response, next: any) {
    const intakeFormCommand = new IntakeForm(req);
    await new BaseController().run(
        intakeFormCommand.path,
        intakeFormCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async downloadIntakeForm(req: Request, res: Response, next: any) {
    const downloadIntakeFormCommand = new DownloadIntakeForm(req);
    await new BaseController().run(
        downloadIntakeFormCommand.path,
        downloadIntakeFormCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async symptomAnalysis(req: Request, res: Response, next: any) {
    const symptomAnalysisCommand = new SymptomAnalysis(req);
    await new BaseController().run(
        symptomAnalysisCommand.path,
        symptomAnalysisCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async downloadSymptomAnalysis(req: Request, res: Response, next: any) {
    const symptomAnalysisCommand = new DownloadSymptomAnalysis(req);
    await new BaseController().run(
        symptomAnalysisCommand.path,
        symptomAnalysisCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async myPhasesOfCare(req: Request, res: Response, next: any) {
    const myPhasesOfCareCommand = new MyPhasesOfCare(req);
    await new BaseController().run(
        myPhasesOfCareCommand.path,
        myPhasesOfCareCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next MyPaymentHistory
  */
  async myPaymentHistory(req: any, res: Response, next: any) {
    const userId: string =
      req.decoded && req.decoded.user_id ?
        req.decoded.user_id : '';
    req.params.userId = userId;

    const paymentHistoryCommand = new PaymentHistory(req);
    await new BaseController().run(
        paymentHistoryCommand.path,
        paymentHistoryCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async downloadPaymentHistory(req: Request, res: Response, next: any) {
    const downloadPaymentHistoryCommand = new DownloadPaymentHistory(req);
    await new BaseController().run(
        downloadPaymentHistoryCommand.path,
        downloadPaymentHistoryCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  // /DownloadPaymentDetails

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async getPaymentDetails(req: Request, res: Response, next: any) {
    const getPaymentDetailsCommand = new GetPaymentDetails(req);
    await new BaseController().run(
        getPaymentDetailsCommand.path,
        getPaymentDetailsCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async downloadPaymentDetails(req: Request, res: Response, next: any) {
    const downloadPaymentDetailsCommand = new DownloadPaymentDetails(req);
    await new BaseController().run(
        downloadPaymentDetailsCommand.path,
        downloadPaymentDetailsCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async customerStats(req: any, res: Response, next: any) {
    const userId: string =
    req.decoded && req.decoded.user_id ?
      req.decoded.user_id : '';
    req.params.userId = userId;
    req.params.appointmentStats = true;
    req.params.subscriptionStats = true;
    req.params.phasesOfCareStats = true;

    const customerStatsCommand = new CustomerStats(req);
    await new BaseController().run(
        customerStatsCommand.path,
        customerStatsCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async myhealthPlan(req: any, res: Response, next: any) {
    const myhealthPlanCommand = new MyhealthPlan(req);
    await new BaseController().run(
        myhealthPlanCommand.path,
        myhealthPlanCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async myhealthPlanMarkasComplete(req: any, res: Response, next: any) {
    const myhealthPlanItemMarkasCompleteCommand =
      new MyhealthPlanItemMarkasComplete(req);
    await new BaseController().run(
        myhealthPlanItemMarkasCompleteCommand.path,
        myhealthPlanItemMarkasCompleteCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async undoDailyGoalMarkasComplete(req: any, res: Response, next: any) {
    const undoDailyGoalMarkasCompleteCommand =
        new UndoDailyGoalMarkasComplete(req);
    await new BaseController().run(
        undoDailyGoalMarkasCompleteCommand.path,
        undoDailyGoalMarkasCompleteCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async myhealthPlanItemasViewed(req: any, res: Response, next: any) {
    const commandObj =
          new MyhealthPlanItemasViewedCommand(req);
    await new BaseController().run(
        commandObj.path,
        commandObj,
        res,
        true,
        false,
        next,
        req,
    );
  }


  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
  async myTests(req: any, res: Response, next: any) {
    const myTestsCommand = new MyTests(req);
    await new BaseController().run(
        myTestsCommand.path,
        myTestsCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
}
