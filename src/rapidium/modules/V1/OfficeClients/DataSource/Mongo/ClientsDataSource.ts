import { GetClients } from '@basePath/OfficeClients/Commands/GetClients';
import { GetClientDetails }
  from '@basePath/OfficeClients/Commands/GetClientDetails';
import { UpdateClient } from '@basePath/OfficeClients/Commands/UpdateClient';
import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import { RoleSchema } from '@basePath/Admin/DataSource/Models/Schema/RoleSchema';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { CustomerSchema }
  from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';

import AssignmentDetails
  from '@basePath/OfficeClients/DataSource/Mongo/AssignmentDetails';
import { CurrentAppointment }
  from '@basePath/Appointments/Commands/CurrentAppointment';
import { CustomerStats }
  from '@basePath/Customer/Commands/CustomerStats';
import ClientGoals
  from '@basePath/OfficeClients/DataSource/Mongo/ClientGoals';
import ClientHealthPlan
  from '@basePath/OfficeClients/DataSource/Mongo/ClientHealthPlan';
import { IClientsReponseData }
  from '@basePath/OfficeClients/Interfaces/IClientsReponseData';
import { IClients } from '@basePath/OfficeClients/Interfaces/IClients';
import { ICustomers } from '@basePath/OfficeClients/Interfaces/ICustomers';
import { IUsers } from '@basePath/OfficeClients/Interfaces/IUsers';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import moment from 'moment-timezone';

import { SubscriptionPlansSchema }
  from '@basePath/PWA/DataSource/Models/Schema/SubscriptionPlans';
const environment = process.env;
/**
 * class ClientsDataSource
 */
export default class ClientsDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async getClients(data: GetClients) {
    try {
      const roleBasedClientsQry = {};
      if (data.userData.code) {
        if (data.userData.code == 'md') { //md key name should be changed
          Object.assign(roleBasedClientsQry, {
            $or: [
              {
                'physician.assignment_user_info._id': ObjectId(
                  data.userData.user_id,
                ),
              },
              { type: 'md' },
            ],
          });
        }
        if (data.userData.code == 'health_coach') {
          Object.assign(roleBasedClientsQry, {
            $or: [
              {
                'health_coach.assignment_user_info._id': ObjectId(
                  data.userData.user_id,
                ),
              },
              { type: 'health_coach' },
            ],
          });
        }
      }
      const skip = (data.page - 1) * data.perPage;
      const limit = data.perPage;
      const sort = data.sort == 'DESC' ? -1 : 1;
      const search = data.search ? data.search.trim() : data.search;
      const searchQry = {};
      if (data.search != '') {
        Object.assign(searchQry, {
          $or: [
            { first_name: { $regex: `.*${search}.*`, $options: 'i' } },
            { last_name: { $regex: `.*${search}.*`, $options: 'i' } },
            // { email: { $regex: `.*${search}.*`, $options: 'i' } },
            { email: { $regex: `.*${search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}.*`, $options: 'i' } },
            { gwc_client_id: { $regex: `.*${search}.*`, $options: 'i' } },
            { 'health_coach.assignment_user_info.first_name': { $regex: `.*${search}.*`, $options: 'i' } },
            { 'physician.assignment_user_info.first_name': { $regex: `.*${search}.*`, $options: 'i' } },
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ['$health_coach.assignment_user_info.first_name', ' ', '$health_coach.assignment_user_info.last_name'] },
                  regex: search,
                  options: 'i',
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ['$physician.assignment_user_info.first_name', ' ', '$physician.assignment_user_info.last_name'] },
                  regex: search,
                  options: 'i',
                },
              },
            },
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ['$first_name', ' ', '$last_name'] },
                  regex: search,
                  options: 'i',
                },
              },
            },
          ],
        });
      }

      const sortQuery = {};

      if (data.column != '' && sort) {
        let column = '';
        if (data.column === 'health_coach') {
          column = 'health_coach.assignment_user_info.first_name';
        } else if (data.column === 'physician') {
          column = 'physician.assignment_user_info.first_name';
        } else if (data.column === 'gwc_client_id') {
          column = 'customer_data.gwc_client_id';
        } else {
          column = data.column;
        }
        Object.assign(sortQuery, {
          [column]: sort
        });
      } else {
        Object.assign(sortQuery, {
          'first_name': sort
        });
      }
      return await UserSchema.aggregate([
        { $match: { user_type: 2, status: true } },
        {
          $lookup: {
            from: 'customers',
            localField: '_id',
            foreignField: 'user_id',
            as: 'customer_data',
          },
        },
        { $unwind: { path: '$customer_data', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'customer_assignments',
            let: { id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$client_id', '$$id'] },
                },
              },
              { $match: { type: 'health_coach' } },
              {
                $lookup: {
                  from: 'users',
                  let: { id: '$assignment_user_id' },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', '$$id'] },
                      },
                    },
                    { $project: { first_name: 1, last_name: 1, email: 1 } }
                  ],
                  as: 'assignment_user_info',
                },
              },
              { $unwind: { path: '$assignment_user_info', preserveNullAndEmptyArrays: true } }
            ],
            as: 'health_coach',
          },
        },
        { $unwind: { path: '$health_coach', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'customer_assignments',
            let: { id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$client_id', '$$id'] },
                },
              },
              { $match: { type: 'md' } },
              {
                $lookup: {
                  from: 'users',
                  let: { id: '$assignment_user_id' },
                  pipeline: [
                    {
                      $match: {
                        $expr: { $eq: ['$_id', '$$id'] },
                      },
                    },
                    { $project: { first_name: 1, last_name: 1, email: 1 } }
                  ],
                  as: 'assignment_user_info',
                },
              },
              { $unwind: { path: '$assignment_user_info', preserveNullAndEmptyArrays: true } }
            ],
            as: 'physician',
          },
        },
        { $unwind: { path: '$physician', preserveNullAndEmptyArrays: true } },
        { $match: roleBasedClientsQry },
        { $sort: sortQuery },
        { $match: searchQry },
        {
          $facet: {
            paginated_results: [
              {
                $skip: skip,
              },
              { $limit: limit },
              {
                $project: {
                  _id: 1,
                  first_name: 1,
                  last_name: 1,
                  email: 1,
                  phone: '$customer_data.phone',
                  gwc_client_id: '$customer_data.gwc_client_id',
                  health_coach: {
                    first_name: '$health_coach.assignment_user_info.first_name',
                    last_name: '$health_coach.assignment_user_info.last_name'
                  },
                  physician: {
                    first_name: '$physician.assignment_user_info.first_name',
                    last_name: '$physician.assignment_user_info.last_name'
                  },
                  img_name: '$img_unique_name'
                },
              },
            ],
            total_count: [
              {
                $count: 'count',
              },
            ],
          },
        }
      ])
        .collation({ locale: 'en', strength: 1 })
        .allowDiskUse(true)
        .then((clientsData: IClientsReponseData[]) => {
          const clients: IClients[] = clientsData[0].paginated_results;
          const clientsCount: number =
            clientsData[0].total_count &&
              clientsData[0].total_count[0] &&
              clientsData[0].total_count[0].count ?
              clientsData[0].total_count[0].count :
              0;
          let clientsArr: any = [];
          clients.map((client) => {
            let clientObj: any = {};
            clientObj = {
              _id: client._id,
              first_name: client.first_name,
              last_name: client.last_name,
              gwc_client_id: client.gwc_client_id,
              display_url: client.img_name ? environment.api_base_url + client.img_name : '',
              health_coach: client.health_coach,
              physician: client.physician,
            };
            clientsArr.push(clientObj);
          });
          return { result: clientsArr, count: clientsCount };
        });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getClientDetails(data: GetClientDetails) {
    try {
      return await UserSchema.aggregate([
        { $match: { _id: ObjectId(data.id) } },
        {
          $lookup: {
            from: 'customers',
            localField: '_id',
            foreignField: 'user_id',
            as: 'customer_data',
          },
        },
        {
          $unwind: {
            path: '$customer_data',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            id: 1,
            email: 1,
            first_name: '$customer_data.first_name',
            last_name: '$customer_data.last_name',
            phone: '$customer_data.phone',
            gwc_client_id: '$customer_data.gwc_client_id',
            address: '$customer_data.address',
            dob: '$customer_data.dob',
            ethnicity: '$customer_data.ethnicity',
            gender: '$customer_data.gender',
            height: '$customer_data.height',
            weight: '$customer_data.weight',
            state: '$customer_data.state',
            intake_submitted: '$customer_data.intake_submitted',
            symptom_analysis_submitted: '$customer_data.symptom_analysis_submitted',
            stripe_subscription_id: '$customer_data.stripe_subscription_id',
            subscription_status: '$customer_data.subscription_status',
            subscription_start_date: '$customer_data.subscription_start_date',
            subscription_end_date: '$customer_data.subscription_end_date',
            subscription_plan_id: '$customer_data.subscription_plan_id',
            location: '$customer_data.location',
            language: '$customer_data.language',
            stripe_customer_id: '$customer_data.stripe_customer_id' ?
              '$customer_data.stripe_customer_id' : '',
            img_name: '$customer_data.img_unique_name',
            current_health_journey_status:
              '$customer_data.current_health_journey_status'
          },
        },
      ])
        .then(async (customer: ICustomers[]) => {
          if (customer && customer[0]) {
            //Client Assignments
            customer[0].assignment_details = await new AssignmentDetails().get(data);

            //Client Goals
            customer[0].goals = await new ClientGoals().get(data);

            //Appointment Details
            const currentAppointmentCommand = new CurrentAppointment({
              params: { client_id: data.id },
              decoded: data.userData
            });
            const currentAppointment = await new CommandFactory().getCommand(
              currentAppointmentCommand.path,
              true,
              currentAppointmentCommand,
            );
            if (currentAppointment.post.start_date) {
              customer[0].next_visit = currentAppointment.post.start_date;
            }
            if (currentAppointment.pre.start_date) {
              customer[0].last_visit = currentAppointment.pre.start_date;
            }
            customer[0].active_health_plan = await new ClientHealthPlan(currentAppointment).active(data);
            customer[0].draft_health_plan = await new ClientHealthPlan(currentAppointment).draft(data);
            //Appointment Count Details

            const CustomerStatsCommand = new CustomerStats({
              params: { userId: ObjectId(data.id), appointmentStats: true, subscriptionStats: true }
            });
            const { totalAppointmentsCount, attendedAppointmentsCount, subscriptionPlanDuration, subscriptionPaymentsReceivedCount } = await new CommandFactory().getCommand(
              CustomerStatsCommand.path,
              true,
              CustomerStatsCommand,
            );
            customer[0].appointments_count = {
              total_appointments: totalAppointmentsCount,
              completed_appointments: attendedAppointmentsCount
            }
            customer[0].payments_count = {
              total_subscription_months: subscriptionPlanDuration,
              completed_subscription_months: subscriptionPaymentsReceivedCount
            }
            if (customer[0].dob) {
              customer[0].age = this.getCustomerAge(customer[0].dob);
            }
            if (customer[0].subscription_plan_id) {
              const subPlanInfo = await this.getSubscriptionPlanInfo(
                customer[0].subscription_plan_id,
              );
              Object.assign(customer[0], {
                subscription_plan_info: subPlanInfo,
              });
            }
            if (customer[0].subscription_start_date) {
              customer[0].todo_list_dueDate = moment(customer[0].subscription_start_date).add(2, 'days').toDate()
            }
            customer[0].display_url = '';
            if (customer[0].img_name) {
              customer[0].display_url = environment.api_base_url + customer[0].img_name
            }


            return customer[0];
          } else {
            throw new ResourceNotFound('No Client Found', '');
          }
        })
        .catch(async (error: any) => {
          return { success: false, message: error.message };
        });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
   *
   * @param {subPlanId} subPlanId
   * @return {Object}
   */
  async getSubscriptionPlanInfo(subPlanId: string) {
    try {
      return await SubscriptionPlansSchema.findById(
        ObjectId(subPlanId),
        function (err, docs) {
          if (err) {
            throw new ResourceNotFound(err.message, '');
          } else {
            return docs;
          }
        },
      );
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
   * @param {customerDob} customerDob
   * @return {Object}
   */
  getCustomerAge(customerDob) {
    const date = moment(customerDob).format('MM/DD/YYYY');
    const dob = new Date(date);
    const monthDiff = Date.now() - dob.getTime();
    const ageDt = new Date(monthDiff);
    const year = ageDt.getUTCFullYear();
    return Math.abs(year - 1970);
  }

  /**
   * @param {data} data
   * @return {Object}
   */
  async updateClient(data: UpdateClient) {
    try {

      await UserSchema.findByIdAndUpdate(
        data.id,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          img_file_name: data.img_file_name,
          img_unique_name: data.img_unique_name
        },
        { new: true },
      );

      const customerObj = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        address: data.address,
        state: data.state,
        dob: data.dob,
        ethnicity: data.ethnicity,
        height: data.height,
        weight: data.weight,
        img_file_name: data.img_file_name,
        img_unique_name: data.img_unique_name,
        location: data.location,
      };

      return await CustomerSchema.findOneAndUpdate(
        { user_id: data.id },
        customerObj,
        { new: true },
      );
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
}