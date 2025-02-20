
import {CustomerStats} from '@basePath/Customer/Commands/CustomerStats';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
// eslint-disable-next-line
import {AppointmentSchema} from '@basePath/Appointments/DataSource/Models/Schema/AppointmentSchema';
// eslint-disable-next-line
import {AppointmentStatusesSchema} from '@basePath/Appointments/DataSource/Models/Schema/AppointmentStatusesSchema';
import {CustomerSchema}
  from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
// eslint-disable-next-line
import CustomerSubscriptionOperations from '@basePath/Subscriptions/DataSource/Models/CustomerSubscriptionOperations';
import AdminDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
import {GetHealthPlan} from '@basePath/HealthPlan/Commands/GetHealthPlan';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import {ClientStatusesSchema}
  from
  '@basePath/HealthPlan/DataSource/Models/Schema/ClientStatusesSchema';
/**
   * class CustomerStatsDataSource
   */
export default class CustomerStatsDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async customerStats(data: CustomerStats) {
    const response = {};
    if (data.appointmentStats) {
      const apptsStats = await this.getCustomerAppointmentsStats(data.userId);
      Object.assign(response, {
        totalAppointmentsCount: apptsStats.totalAppointmentsCount,
        attendedAppointmentsCount: apptsStats.attendedAppointmentsCount,
      });
    }
    if (data.subscriptionStats) {
      const subscriptionStats = await this.getCustomerSubscriptionStats(
          data.userId,
      );
      Object.assign(response, {
        subscriptionPlanDuration: subscriptionStats.subscriptionPlanDuration,
        subscriptionPaymentsReceivedCount:
          subscriptionStats.subscriptionPaymentReceivedCount,
      });
    }
    if (data.phasesOfCareStats) {
      const phasesOfCareStats = await this.getCustomerPhasesOfCareStats(
          data.userId,
      );
      Object.assign(response, {
        phasesOfCareCount: phasesOfCareStats.phasesOfCareCount,
        completedPhasesOfCareCount:
          phasesOfCareStats.completedPhasesOfCareCount,
      });
    }

    return response;
  }
  /**
   *
   * @param {userId} userId
   * @return {Object}
   */
  async getCustomerAppointmentsStats(userId: string) {
    const statuses = await AppointmentStatusesSchema.find(
        {
          code: {
            $in: [
              'scheduled',
              'rescheduled',
              'late-rescheduled',
              'attended',
              'late-show',
            ],
          },
        },
        {_id: 1, code: 1},
    );
    let scheduled: any[] = [];
    let attendedStatus: any[] = [];
    if (statuses.length) {
      scheduled = statuses
          .filter(
              (status) =>
                status.code === 'attended' ||
            status.code === 'late-show' ||
            status.code === 'scheduled' ||
            status.code === 'rescheduled' ||
            status.code === 'late-rescheduled',
          )
          .map((status) => ObjectId(status._id));
      // eslint-disable-next-line
      attendedStatus = statuses.filter((status) => status.code === 'attended' || status.code === 'late-show',)
          .map((status) => ObjectId(status._id));
    }
    const appts = await AppointmentSchema.find({
      client_id: ObjectId(userId),
      status: {$in: scheduled},
    });

    let attndApptsCount: number = 0;
    if (appts && appts.length > 0) {
      attendedStatus.forEach((statusId) => {
        const attndapps = appts.filter((apps) => {
          return apps.status.toString() === statusId.toString();
        }).length;

        attndApptsCount = attndApptsCount + attndapps;
      });
    }

    const totalAppointmentsCount: number =
      appts && appts.length > 0 ? appts.length : 0;

    return {
      totalAppointmentsCount: totalAppointmentsCount,
      attendedAppointmentsCount: attndApptsCount,
    };
  }
  /**
   *
   * @param {userId} userId
   * @return {Object}
   */
  async getCustomerSubscriptionStats(userId: string) {
    try {
      const customerInfo = await CustomerSchema.findOne({
        user_id: ObjectId(userId),
      });
      if (customerInfo && customerInfo.stripe_subscription_id) {
        // eslint-disable-next-line
        const customerSubData = await new CustomerSubscriptionOperations().customerSubscriptionHistoryFind(
            {
              user_id: ObjectId(userId),
              stripe_subscription_id: customerInfo.stripe_subscription_id,
            },
        );
        if (customerSubData && customerSubData.length) {
          return {
            subscriptionPlanDuration: customerSubData[0].plan_duration,
            subscriptionPaymentReceivedCount: customerSubData.length,
          };
        }

        return {
          subscriptionPlanDuration: 0,
          subscriptionPaymentReceivedCount: 0,
        };
      } else {
        return {
          subscriptionPlanDuration: 0,
          subscriptionPaymentReceivedCount: 0,
        };
      }
    } catch (error: any) {
      return {
        subscriptionPlanDuration: 0,
        subscriptionPaymentReceivedCount: 0,
      };
    }
  }
  /**
   *
   * @param {userId} userId
   * @return {Object}
   */
  async getCustomerPhasesOfCareStats(userId: string) {
    //   const userData = {
    //     user_id:userId
    //   }
    // const phsstats = await new AdminDataSource().myPhasesOfCare(userData)

    const healthPlan =
      await new AdminDataSource().getCustomerActiveHealthPlanData({
        client_id: userId,
        is_active: true,
      });
    if (healthPlan && healthPlan.length > 0) {
      const getHealthPlanCommand = new GetHealthPlan({
        params: {
          client_id: userId,
          health_plan_id: healthPlan[0]._id,
          type: 'phasesOfCare',
        },
      });
      const phsstats = await new CommandFactory().getCommand(
          getHealthPlanCommand.path,
          true,
          getHealthPlanCommand,
      );

      if (phsstats && phsstats.count > 0) {
        let completedCount: number = 0;
        const statuses = await ClientStatusesSchema.find(
            {code: {$in: ['complete']}},
            {
              _id: 1,
              value: '$_id',
              label: '$name',
              code: 1,
            },
        );

        statuses.forEach((status) => {
          const cmptdphs = phsstats.result.filter((phs) => {
            return phs.status.toString() === status._id.toString();
          }).length;
          completedCount = completedCount + cmptdphs;
        });

        return {
          phasesOfCareCount: phsstats.count,
          completedPhasesOfCareCount: completedCount,
        };
      } else {
        return {
          phasesOfCareCount: 0,
          completedPhasesOfCareCount: 0,
        };
      }
    } else {
      return {
        phasesOfCareCount: 0,
        completedPhasesOfCareCount: 0,
      };
    }
  }
}
