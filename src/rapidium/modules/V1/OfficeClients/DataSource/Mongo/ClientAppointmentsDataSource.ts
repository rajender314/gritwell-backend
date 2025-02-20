import {ClientAppointments}
  from '@basePath/OfficeClients/Commands/ClientAppointments';
import {AppointmentSchema}
  from '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
import AcuityOperations
  from '@basePath/Acuity/DataSource/Models/AcuityOperations';

import {ObjectId} from '@rapCore/src/Mongodb/Types';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
const environment = process.env;
import {AppointmentStatusesSchema}
  from
  '@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema';
/**
 * class ClientAppointmentsDataSource
 */
export default class ClientAppointmentsDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async getAppointments(data: ClientAppointments) {
    const settingAppntHoursInfo = await new AcuityOperations().settingFindFun({
      object_key: 'appointment_reschedule_or_cancel_within_hours',
    });
    if (settingAppntHoursInfo === null) {
      throw new ResourceNotFound(
          'Appointment reschedule/cancel within hours not found',
          '',
      );
    }
    const appntReshRCanclHours =
      settingAppntHoursInfo && settingAppntHoursInfo.object_value ?
        settingAppntHoursInfo.object_value :
        48;

    const matchObj = {client_id: ObjectId(data.client_id)};
    if (data.type === 'upcoming') {
      Object.assign(matchObj, {
        start_date: {$gte: new Date()},
      });
    }
    if (data.type === 'past') {
      Object.assign(matchObj, {
        start_date: {$lte: new Date()},
      });
    }


    return await AppointmentSchema.aggregate([
      // {
      //   $match: {
      //     client_id: ObjectId(data.client_id),

      //   },
      // },
      {
        $match: matchObj,
      },
      {
        $lookup: {
          from: 'office_users',
          localField: 'user_id',
          foreignField: 'user_id',
          as: 'office_users_data',
        },
      },
      {
        $unwind: {
          path: '$office_users_data',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'appointment_statuses',
          localField: 'status',
          foreignField: '_id',
          as: 'status_data',
        },
      },
      {
        $unwind: {
          path: '$status_data',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {_id: 1},
      },
      {
        $addFields: {
          pre_session_servery_enable: false,
          zoom_link_enable: false,
          post_session_servery_enable: false,
        },
      },
      {
        $facet: {
          paginated_results: [
            {
              $project: {
                name: 1,
                status: {
                  value: '$status_data._id',
                  label: '$status_data.name',
                  code: '$status_data.code',
                },
                start_date: 1,
                end_date: 1,
                user_id: 1,
                acuity_confirmation_page: 1,
                health_coach: {
                  name: {
                    $concat: [
                      '$office_users_data.first_name',
                      ' ',
                      '$office_users_data.last_name',
                    ],
                  },
                  img_name: '$office_users_data.img_unique_name',
                  display_url: '$office_users_data.img_unique_name' ?
                    {
                      $concat: [
                        environment.api_base_url,
                        '',
                        '$office_users_data.img_unique_name',
                      ],
                    } :
                    '',
                  zoom_link: '$office_users_data.zoom_link',
                },
                // acuity_appointment_status: 1,
                client_attendance_status: 1,
                is_pre_session_servery_submitted: 1,
                is_post_session_servery_submitted: 1,
                appointment_type: 1,
                pre_session_servery_enable: 1,
                zoom_link_enable: 1,
                post_session_servery_enable: 1,
              },
            },
          ],
          total_count: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ])
        .then(async (appointmentsData: any) => {
          const appointments = appointmentsData[0].paginated_results;

          const appointmentsCount: number =
          appointmentsData[0].total_count &&
          appointmentsData[0].total_count[0] &&
          appointmentsData[0].total_count[0].count ?
            appointmentsData[0].total_count[0].count :
            0;
          if (appointments && appointments.length > 0) {
            if (data.type === 'past') {
              appointments.forEach(async (apppt) => {
                if (apppt.status.code === 'scheduled') {
                  if (!apppt.pre_session_servery_enable) {
                    apppt.pre_session_servery_enable = true;
                  }
                  apppt.zoom_link_enable = true;
                }
                if (
                  apppt.status.code === 'attended' ||
                    apppt.status.code === 'late-show' ) {
                  if (!apppt.is_post_session_servery_submitted) {
                    apppt.post_session_servery_enable = true;
                  }
                }
              });
              return {count: appointmentsCount, result: appointments};
            } else if (data.type === 'upcoming') {
              const formatedAppt: any = [];

              appointments.forEach(async (apppt) => {
                if (
                  apppt.status.code != 'attended' &&
                apppt.status.code != 'canceled' &&
                apppt.status.code != 'late-canceled'
                ) {
                  formatedAppt.push(apppt);
                }
              });

              if (data.onlyFirstAppointment === 'one') {
                const nearestAppt = await this.getClosetDateObj(formatedAppt);

                if (nearestAppt && nearestAppt.name && nearestAppt.status) {
                  const nameArray = nearestAppt.name.split(' ', 2);
                  const prevsNum = nameArray[1] ? nameArray[1] - 1 : 0;

                  if (prevsNum > 0) {
                    // let prevsAptPostServeyStatus: boolean = false;
                    const prevName = 'Session ' + prevsNum;
                    // const prevAppt = appointments.find(
                    //     async (appt) => appt.name === prevName,
                    // );
                    let previousIndex = 0;
                    appointments.forEach(async (app: any, index: any) => {
                      if (app.name === prevName) {
                        previousIndex = index;
                      }
                    });
                    const prevAppt = appointments[previousIndex];
                    // prevsAptPostServeyStatus =
                    // prevAppt.is_post_session_servery_submitted;
                    if (
                      prevAppt &&
                    prevAppt.status &&
                    prevAppt.status.code &&
                    prevAppt.status.code === 'attended' &&
                    !prevAppt.is_post_session_servery_submitted
                    ) {
                      appointments.forEach(async (appointment) => {
                        if (appointment._id === prevAppt._id) {
                          appointment.post_session_servery_enable = true;
                        }
                      });
                    }
                  }

                  // eslint-disable-next-line
                let appontRshRcancelHoursCondition: boolean = false;
                  if (nearestAppt && nearestAppt.start_date) {
                    // eslint-disable-next-line
                    appontRshRcancelHoursCondition = await new AcuityOperations().checkAppointmentReshRCanclHours({
                      start_date: nearestAppt.start_date,
                      offSet: data.offSet,
                      appntReshRCanclHours: appntReshRCanclHours,
                    });
                  }

                  // && appontRshRcancelHoursCondition

                  if (
                    ((nearestAppt &&
                    nearestAppt.status &&
                    nearestAppt.status.code === 'scheduled') ||
                    nearestAppt.status.code === 'rescheduled' ||
                    nearestAppt.status.code === 'late-rescheduled') &&
                  nearestAppt.appointment_type != 'INITIAL_APPOINTMENT' &&
                  appontRshRcancelHoursCondition
                  ) {
                    appointments.forEach(async (appointment) => {
                      if (appointment._id === nearestAppt._id) {
                        if (appointment.is_pre_session_servery_submitted) {
                          appointment.pre_session_servery_enable = false;
                        } else {
                          appointment.pre_session_servery_enable = true;
                        }

                        appointment.zoom_link_enable = true;
                      }
                    });
                  }
                  if (
                    ((nearestAppt &&
                    nearestAppt.status &&
                    nearestAppt.status.code &&
                    nearestAppt.status.code === 'scheduled') ||
                    nearestAppt.status.code === 'rescheduled' ||
                    nearestAppt.status.code === 'late-rescheduled') &&
                  nearestAppt.appointment_type === 'INITIAL_APPOINTMENT' &&
                  appontRshRcancelHoursCondition
                  ) {
                    appointments.forEach(async (appointment) => {
                      if (appointment._id === nearestAppt._id) {
                        appointment.pre_session_servery_enable = false;
                        appointment.zoom_link_enable = true;
                      }
                    });
                  }

                  return {count: 1, result: [nearestAppt]};
                } else {
                  return {count: 0, result: []};
                }
              }
              const ObjeIndex = await this.getClosetDateObj(formatedAppt);

              if (ObjeIndex && ObjeIndex.name) {
                const ObjeIndex = await this.getClosetDateObj(formatedAppt);

                const nameArray =
                ObjeIndex && ObjeIndex.name ? ObjeIndex.name.split(' ', 2) : '';
                const prevsNum =
                  nameArray && nameArray[1] ? nameArray[1] - 1 : 0;


                if (prevsNum > 0) {
                  // let prevsAptPostServeyStatusInfo: boolean = false;
                  const prevName = 'Session ' + prevsNum;

                  let previousIndex = 0;
                  appointments.forEach(async (app: any, index: any) => {
                    if (app.name === prevName) {
                      previousIndex = index;
                    }
                  });
                  const prevAppt = appointments[previousIndex];

                  // prevsAptPostServeyStatusInfo =
                  // prevAppt.is_post_session_servery_submitted;
                  if (
                    prevAppt &&
                  prevAppt.status &&
                  prevAppt.status.code &&
                  (prevAppt.status.code === 'attended' ||
                    prevAppt.status.code === 'late-show') &&
                  !prevAppt.is_post_session_servery_submitted
                  ) {
                    appointments.forEach(async (appointment) => {
                      if (appointment._id === prevAppt._id) {
                        appointment.post_session_servery_enable = true;
                      }
                    });
                  }
                }

                // eslint-disable-next-line
              let appontRshRcancelHoursCon: boolean = false;
                if (ObjeIndex && ObjeIndex.start_date) {
                  appontRshRcancelHoursCon =
                  await new AcuityOperations().checkAppointmentReshRCanclHours({
                    start_date: ObjeIndex.start_date,
                    offSet: data.offSet,
                    appntReshRCanclHours: appntReshRCanclHours,
                  });
                }

                // && appontRshRcancelHoursCon

                if (
                  ((ObjeIndex &&
                  ObjeIndex.status &&
                  ObjeIndex.status.code &&
                  ObjeIndex.status.code === 'scheduled') ||
                  ObjeIndex.status.code === 'rescheduled' ||
                  ObjeIndex.status.code === 'late-rescheduled') &&
                ObjeIndex.appointment_type != 'INITIAL_APPOINTMENT' &&
                appontRshRcancelHoursCon
                ) {
                  appointments.forEach(async (appointment) => {
                    if (appointment._id === ObjeIndex._id) {
                      if (appointment.is_pre_session_servery_submitted) {
                        appointment.pre_session_servery_enable = false;
                      } else {
                        appointment.pre_session_servery_enable = true;
                      }

                      appointment.zoom_link_enable = true;
                    }
                  });
                }
                if (
                  ((ObjeIndex &&
                  ObjeIndex.status &&
                  ObjeIndex.status.code &&
                  ObjeIndex.status.code === 'scheduled') ||
                  ObjeIndex.status.code === 'rescheduled' ||
                  ObjeIndex.status.code === 'late-rescheduled') &&
                ObjeIndex.appointment_type === 'INITIAL_APPOINTMENT' &&
                appontRshRcancelHoursCon
                ) {
                  appointments.forEach(async (appointment) => {
                    if (appointment._id === ObjeIndex._id) {
                      appointment.pre_session_servery_enable = false;
                      appointment.zoom_link_enable = true;
                    }
                  });
                }
                if (
                  ObjeIndex &&
                ObjeIndex.status &&
                ObjeIndex.status.code &&
                (ObjeIndex.status.code === 'attended' ||
                  ObjeIndex.status.code === 'late-show') &&
                !ObjeIndex.is_post_session_servery_submitted &&
                appontRshRcancelHoursCon
                ) {
                  appointments.forEach(async (appointment) => {
                    if (appointment._id === ObjeIndex._id) {
                      appointment.post_session_servery_enable = true;
                    }
                  });
                }

                const diffmints: number =
                await new AcuityOperations().dateDiffInminutes({
                  start_date: ObjeIndex.end_date,
                  offSet: data.offSet,
                });
                if (diffmints > 10 && diffmints < 15) {
                  appointments.forEach(async (appointment) => {
                    if (appointment._id === ObjeIndex._id) {
                      appointment.zoom_link_enable = true;
                    }
                  });
                }

                return {count: appointmentsCount, result: appointments};
              } else {
                return {count: 0, result: []};
              } // end of ObjeIndex
            }// end of if upcoming
          } else {
            return {count: appointmentsCount, result: []};
          }
        })
        .catch(async (error: any) => {
          return {success: false, message: error.message};
        });
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getClosetDateObj(data: any) {
    const temp: any = data.map((d) =>
      Math.abs(+new Date() - new Date(d.start_date).getTime()),
    );
    const idx = temp.indexOf(Math.min(...temp));

    return data[idx];
  }

  /**
   * @param {apptDate} apptDate
   * @param {clientId} clientId
   * @return {object}
   */
  async getAppointmentFromDate(apptDate:string, clientId: string) {
    const stats = await this.getAppointmentStatusIds(['attended', 'late-show']);
    // const matchObj = {
    //   client_id: ObjectId(clientId),
    //   start_date: {$lte: new Date(apptDate)},
    //   status: {$in: stats},
    // };
    // return await AppointmentSchema.findOne(matchObj)
    //     .sort({start_date: -1})
    //     .limit(1);

    const appt:any = await AppointmentSchema.aggregate([
      {
        $addFields: {
          onlyDate: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$start_date',
            },
          },
        },
      },
      {
        $match: {
          onlyDate: {
            '$lte': apptDate,
          },
          client_id: ObjectId(clientId),
          status: {$in: stats},
        },
      },
      {
        $sort: {start_date: -1},
      },
      {
        $limit: 1,
      },
    ]);

    return appt && appt.length>0 ? appt[0] : '';
  }

  /**
   *
   * @param {codeArray} codeArray
   * @return {Object}
   */
  async getAppointmentStatusIds(codeArray:any) {
    const statuses = await AppointmentStatusesSchema.find(
        {code: {$in: codeArray}},
        {
          _id: 1,
        },
    );
    const statusesArray = statuses.map(function(status) {
      return ObjectId(status['_id']);
    });
    return statusesArray;
  }
}
