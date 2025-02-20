import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import { AcuityAppointments } from '@basePath/Acuity/Commands/AcuityAppointments';

import { AppointmentSchema }
  from '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import { SettingsSchema }
  from '@basePath/Settings/DataSource/Models/Schema/SettingsSchema';
import { CreateActivePlan }
  from '@basePath/HealthPlan/Commands/CreateActivePlan';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
const environment = process.env;
const Acuity = require('acuityscheduling');
const acuity = Acuity.basic({
  userId: environment.ACUITY_USER_ID,
  apiKey: environment.ACUITY_API_KEY,
});
import moment from 'moment-timezone';
// eslint-disable-next-line
import { AcuityAppointmentResponseSchema } from '@basePath/Acuity/DataSource/Models/Schema/AcuityAppointmentResponseSchema';
import AcuiytAppointmentResponse
  from '@basePath/Acuity/DataSource/Models/AcuityAppointmentResponse';
  import AcuityAppointmentLogs
  from '@basePath/Acuity/DataSource/Models/AcuityAppointmentLogs';
// eslint-disable-next-line
import { AppointmentStatusesSchema } from "@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema";
import {AcuityAppointmentLogsSchema} 
from '@basePath/Acuity/DataSource/Models/Schema/AcuityAppointmentLogsSchema';
/**
 * class AcuityOperations
 */
export default class AcuityOperations {
  /**
   *
   * @param {data} data
   * @return {Object}
   */
  async acuityAppointments(data: AcuityAppointments) {
    try {
      if (data.id) {
        return acuity.request(
            'appointments/' + data.id,
            async (err, res, appointments) => {
              if (err) {
                 await new AcuityAppointmentLogs(AcuityAppointmentLogsSchema,).create({
                  action: "In data source err",
                  response: err,
                });
                return false;
              } else {
                  
             
                const getClientInfo = await this.usersFindFun({
                  email: appointments.email,
                });
                await new AcuityAppointmentLogs(AcuityAppointmentLogsSchema,).create({
                  action: "In data source",
                  params: appointments,
                  response: getClientInfo,
                });
               

                if (getClientInfo != null) {
                  let userId = '';
                  let acuityUserEmail = '';

                  /** Formating Appoinement starting date time to UTC */
                  const aptDate = moment(appointments.date, [
                    'MMM DD, YYYY',
                  ]).format('YYYY-MM-DD');
                  // eslint-disable-next-line
                const aptStTime = moment(appointments.time, ["h:mm A"]).format(
                  'HH:mm',
                );

                const aptStDateTime: string = aptDate + ' ' + aptStTime;
                const aptStartDateTimeUtc = moment
                  .tz(aptStDateTime, appointments.calendarTimezone)
                  .utc();

                /** Formating Appoinement end date time to UTC */
                const aptEndTime = moment(appointments.endTime, [
                  'h:mm A',
                ]).format('HH:mm');

                const aptEndDateTime: string = aptDate + ' ' + aptEndTime;
                const aptEndDateTimeUtc = moment
                  .tz(aptEndDateTime, appointments.calendarTimezone)
                  .utc();

                const getHealthCoachInfo = await this.usersFindFun({
                  acuity_calendar_id: appointments.calendarID,
                });
                if (getHealthCoachInfo != null) {
                  userId = getHealthCoachInfo._id;
                  acuityUserEmail = getHealthCoachInfo.email;
                }
                const aptfindStatusCode: string =
                  data.action == 'scheduled' ?
                    'Scheduled' :
                    data.action == 'rescheduled' ?
                      'Rescheduled' :
                      data.action == 'canceled' ?
                        'Canceled' :
                        'Scheduled';

                const aptStatusInfo = await this.appointmentStatusFindFun({
                  name: aptfindStatusCode,
                });
                let aptStatusId = '';
                let appointmentId = '';
                if (aptStatusInfo) {
                  aptStatusId = aptStatusInfo._id;
                }
                if (
                  data.action == 'rescheduled' ||
                  data.action == 'canceled'
                ) {
                  /** Below code for checking late schedule/late cancle */
                  const apptData = await this.appointmentFindFun({
                    acuity_appointment_id: data.id,
                  });

                  const settingAppntHoursInfo = await this.settingFindFun({
                    object_key:
                      'appointment_reschedule_or_cancel_within_hours',
                  });

                  const appntReshRCanclHours =
                    settingAppntHoursInfo &&
                      settingAppntHoursInfo.object_value ?
                      settingAppntHoursInfo.object_value :
                      48;


                  const appontRshRcancelHoursCon: boolean =
                    await this.checkApptUTCReshCanclHours({
                      start_date: apptData != null ? apptData.start_date : '',
                      appntReshRCanclHours: appntReshRCanclHours,
                    });

                  if (appontRshRcancelHoursCon) {
                    const aptfindStatusCode: string =
                      data.action == 'rescheduled' ?
                        'Late rescheduled' :
                        data.action == 'canceled' ?
                          'Late canceled' :
                          'Late rescheduled';

                    const aptStatusInfo = await this.appointmentStatusFindFun(
                      {
                        name: aptfindStatusCode,
                      },
                    );
                    if (aptStatusInfo) {
                      aptStatusId = aptStatusInfo._id;
                    }
                  }
                  /** code end for checking late schedule/late cancle*/

                  const appointmentObj: any = {
                    status: aptStatusId,
                    start_date: aptStartDateTimeUtc,
                    end_date: aptEndDateTimeUtc,
                    start_time: appointments.time,
                    end_time: appointments.endTime,
                    appointment_type:
                      appointments.type == 'Initial Appointment' ?
                        'INITIAL_APPOINTMENT' :
                        'FOLLOWUP_APPOINTMENT',
                    acuity_calendar_time_zone: appointments.calendarTimezone,
                    acuity_confirmation_page: appointments.confirmationPage,
                    last_modified_date: data.last_modified_date,
                  };
                  const appointmentInfo =
                    await AppointmentSchema.findOneAndUpdate(
                      { acuity_appointment_id: data.id },
                      appointmentObj,
                      { new: true },
                    );
                  appointmentId =
                    appointmentInfo != null ? appointmentInfo._id : '';
                }

                if (data.action == 'scheduled') {
                  const clientAptCountInfo =
                    await this.getClientAppointmentsCount({
                      client_id: getClientInfo._id,
                    });
                  const name: string = 'Session ' + (clientAptCountInfo + 1);

                  const appointmentObj: any = {
                    name: name,
                    status: aptStatusId,
                    client_id: getClientInfo._id,
                    user_id: userId,
                    start_date: aptStartDateTimeUtc,
                    end_date: aptEndDateTimeUtc,
                    start_time: appointments.time,
                    end_time: appointments.endTime,
                    acuity_appointment_id: data.id,
                    acuity_calender_id: appointments.calendarID,
                    acuity_user_email: acuityUserEmail,
                    acuity_client_email: appointments.email,
                    acuity_calendar_time_zone: appointments.calendarTimezone,
                    acuity_confirmation_page: appointments.confirmationPage,
                    appointment_type:
                      appointments.type == 'Initial Appointment' ?
                        'INITIAL_APPOINTMENT' :
                        'FOLLOWUP_APPOINTMENT',
                    created_by: data.created_by,
                    created_date: data.created_date,
                    last_modified_by: data.last_modified_by,
                    last_modified_date: data.last_modified_date,
                  };

                  const appointmentInfo = await AppointmentSchema.create(
                    appointmentObj,
                  );

                  if (appointmentInfo != null && appointmentInfo.appointment_type === 'INITIAL_APPOINTMENT') {
                    const createHealthPlanCommand = new CreateActivePlan({
                      body: { client_id: appointmentInfo.client_id.toString(), appointment_type: appointmentInfo.appointment_type, appointment_id: appointmentInfo._id }
                    });
                    await new CommandFactory().getCommand(
                      createHealthPlanCommand.path,
                      true,
                      createHealthPlanCommand,
                    );
                  }

                  appointmentId =
                    appointmentInfo != null ? appointmentInfo._id : '';
                }

                await new AcuiytAppointmentResponse(
                  AcuityAppointmentResponseSchema,
                ).create({
                  appointment_id: appointmentId,
                  response: appointments,
                });
                return true;
              }
            }
          },
        );
      }
    } catch (error: any) {
      return error.message;
    }
  }

  /**
   *
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async usersFindFun(matchObj: object) {
    return await UserSchema.findOne(matchObj);
  }

  /**
   *
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async appointmentFindFun(matchObj: object) {
    return await AppointmentSchema.findOne(matchObj);
  }

  /**
   *
   * @param {matchObj} matchObj
   * @param {updateObj} updateObj
   * @param {optionsObj} optionsObj
   * @return {Object}
   */
  async appointmentUpdateFun(
    matchObj: object,
    updateObj: object,
    optionsObj: object,
  ) {
    return await AppointmentSchema.findOneAndUpdate(
      matchObj,
      updateObj,
      optionsObj,
    );
  }

  /**
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async settingFindFun(matchObj: object) {
    return await SettingsSchema.findOne(matchObj);
  }
  /**
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async checkAppointmentReshRCanclHours(matchObj: any) {
    let returnStatus = false;
    const appointSt = moment(matchObj.start_date)
      .tz(matchObj.offSet)
      .format('YYYY-MM-DD HH:mm:ss');
    const formatedst = new Date(appointSt);

    const currentUserDt = moment()
      .tz(matchObj.offSet)
      .format('YYYY-MM-DD HH:mm:ss');
    const formatedUser = new Date(currentUserDt);

    let diff = (formatedst.getTime() - formatedUser.getTime()) / 1000;
    diff /= 60 * 60;
    const finalDiffHours = Math.abs(Math.round(diff));

    if (finalDiffHours < parseInt(matchObj.appntReshRCanclHours)) {
      returnStatus = true;
    }

    return returnStatus;
  }
  /**
   * @param {matchObj} matchObj
   * @return {Boolean}
   */
  async checkApptUTCReshCanclHours(matchObj: any) {
    let returnStatus = false;
    const appointSt = moment(matchObj.start_date)
      .format('YYYY-MM-DD HH:mm:ss');
    const formatedst = new Date(appointSt);

    const currentDt = new Date();
    let diff = (formatedst.getTime() - currentDt.getTime()) / 1000;
    diff /= 60 * 60;
    const finalDiffHours = Math.abs(Math.round(diff));

    if (finalDiffHours < parseInt(matchObj.appntReshRCanclHours)) {
      returnStatus = true;
    }

    return returnStatus;
  }

  /**
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async dateDiffInminutes(matchObj: any) {
    const appointSt = moment(matchObj.start_date)
      .tz(matchObj.offSet)
      .format('YYYY-MM-DD HH:mm:ss');
    const formatedst = new Date(appointSt);

    const currentUserDt = moment()
      .tz(matchObj.offSet)
      .format('YYYY-MM-DD HH:mm:ss');
    const formatedUser = new Date(currentUserDt);
    // eslint-disable-next-line
    const difference = formatedUser.getTime() - formatedst.getTime(); // This will give difference in milliseconds
    const resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes;
  }

  /**
   *
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async appointmentStatusFindFun(matchObj: object) {
    return await AppointmentStatusesSchema.findOne(matchObj);
  }
  /**
   *
   * @param {matchObj} matchObj
   * @return {Object}
   */
  async getClientAppointmentsCount(matchObj: object) {
    try {
      return await AppointmentSchema.countDocuments(
        matchObj,
        function (err, count) {
          if (err) {
            return 0;
          } else {
            return count;
          }
        },
      );
    } catch (error: any) {
      return 0;
    }
  }
}
