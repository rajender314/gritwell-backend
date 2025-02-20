import { GetUsers } from '@basePath/Admin/Commands/GetUsers';
import { GetUserDetails } from '@basePath/Admin/Commands/GetUserDetails';
import { UpdateUser } from '@basePath/Admin/Commands/UpdateUser';
import { CreateUser } from '@basePath/Admin/Commands/CreateUser';
import { DeleteProfilePicture }
  from '@basePath/Admin/Commands/DeleteProfilePicture';
import { OfficeUserSchema }
  from '@basePath/Admin/DataSource/Models/Schema/OfficeUserSchema';
import { UserSchema } from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import { RoleSchema } from '@basePath/Admin/DataSource/Models/Schema/RoleSchema';
import { OfficeUserSpecialistsSchema }
  from '@basePath/Admin/DataSource/Models/Schema/OfficeUserSpecialistsSchema';
import { OfficeUserWeekDaysSchema }
  from '@basePath/Admin/DataSource/Models/Schema/OfficeUserWeekDaysSchema';
import { TimeZoneSchema }
  from '@basePath/Admin/DataSource/Models/Schema/TimeZoneSchema';
import { ExperienceSchema }
  from '@basePath/Admin/DataSource/Models/Schema/ExperienceSchema';
import { WeekDaySchema }
  from '@basePath/Admin/DataSource/Models/Schema/WeekDaySchema';
import User from '@basePath/Admin/DataSource/Models/User';
import { ObjectId } from '@rapCore/src/Mongodb/Types';
import { StrEncrypt } from '@basePath/Encrypt';
import { ResourceNotFound } from '@basePath/Exceptions/ResourceNotFound';
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';
import { ClientAssignmentSchema }
  from '@basePath/OfficeClients/DataSource/Models/Schema/ClientAssignmentSchema';
import {ForgotTokenSchema}
  from '@basePath/Web/DataSource/Models/Schema/ForgotTokensSchema';
import ForgotTokens from '@basePath/Web/DataSource/Models/ForgotTokens';
import * as bcrypt from 'bcrypt';  

import {
  IUsers,
  IUser,
  IExperience,
  ITimeZone,
  IUsersResponseData,
} from '@basePath/Admin/Interfaces/IUsers';

const environment = process.env;
/**
 * class UsersDataSource
 */
export default class UsersDataSource {
  /**
     * @param {data} data CreateUser Command
     * @return {Object} Office User
     */
  async createUser(data: CreateUser) {
    try {
      let experience: IExperience | null = {} as IExperience;
      let timeZone: ITimeZone | null = {} as ITimeZone;

      const roleData = await RoleSchema.findById(data.role_id, { code: 1 });

      // Availability
      let available = 0;
      if (roleData != null) {
        if (roleData.code === 'md') {
          available = Number(data.allocation) * 3;
        }
        if (roleData.code === 'health_coach') {
          available = Number(data.allocation);
        }
        let isAdmin = roleData.code === 'admin' ? true : false;

        // Create User for Authentication
        const userData = await UserSchema.create({
          email: data.email,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          is_password_updated: data.is_password_updated,
          img_file_name: data.img_file_name,
          img_unique_name: data.img_unique_name,
          user_type: data.user_type,
          role_id: ObjectId(data.role_id),
          is_admin: isAdmin,
          acuity_calendar_id: data.acuity_calendar_id,
          status: data.status,
          created_by: data.created_by,
          created_date: data.created_date,
          last_modified_by: data.last_modified_by,
          last_modified_date: data.last_modified_date
        });

        // Experience
        if (data.experience) {
          experience = await ExperienceSchema.findById(data.experience, {
            value: '$_id',
            label: '$name',
          }).then((experience) => experience);
        }

        // TimeZone
        if (data.time_zone) {
          timeZone = await TimeZoneSchema.findById(data.time_zone, {
            _id: 1,
            value: '$_id',
            label: '$name',
            offset_value: 1,
            code: 1,
            utc_offset: 1,
            gmt_offset: 1,
          }).then((zone) => zone);
        }

        // Create Office User
        if (data.email && userData._id) {
          const officeUser = await OfficeUserSchema.create({
            first_name: data.first_name,
            last_name: data.last_name,
            user_id: ObjectId(userData._id),
            phone: data.phone,
            img_file_name: data.img_file_name,
            img_unique_name: data.img_unique_name,
            zoom_link: data.zoom_link,
            qualifications: data.qualifications,
            background: data.background,
            experience: experience,
            time_zone: timeZone,
            allocation: data.allocation,
            available: available,
            specialists: data.specialists,
            day_of_the_week: data.day_of_the_week,
            created_by: data.created_by,
            created_date: data.created_date,
            last_modified_by: data.last_modified_by,
            last_modified_date: data.last_modified_date
          });
          // const type = new StrEncrypt().encrypt('createUpdatepwd');
          // const str = userData._id + '/' + type;
          // const url = environment.web_base_url + 'recoverypassword/' + str;
          // const displayName = data.first_name + ' ' + data.last_name;
          // Send Email for User Create Password
          const user = new User(OfficeUserSchema);
          
          
          const salt = bcrypt.genSaltSync(10);
          const tokenId = bcrypt.hashSync(data.email, salt);
          let fwdobj: any = {};
  
          fwdobj = {
            email: data.email,
            token_id: tokenId,
            user_id:  userData._id,
            request_type: 'createUpdatepwd',
          };
  
          const tokenDoc = await new ForgotTokens(ForgotTokenSchema).create(
              fwdobj,
          );
  
          const type = new StrEncrypt().encrypt('createUpdatepwd');
          const str = tokenDoc._id + '/' + type;
          const url = environment.web_base_url + 'recoverypassword/' + str;
          const displayName = data.first_name + ' ' + data.last_name;       
          
          user.sendCreateUserMail(
            data.email,
            url,
            'create_password',
            displayName,
          );

          // Create Office User Specialization
          if (data.specialists && officeUser._id) {
            this.createOfficeUserSpecialists(data.specialists, officeUser._id);
          }

          // Create Office User Day in a Week
          if (data.day_of_the_week && officeUser._id) {
            await this.createOfficeUserWeekday(
              data.day_of_the_week,
              officeUser._id,
            );
          }
        }
        const userCommand = new GetUserDetails({
          params: { id: userData._id },
        });
        return await new CommandFactory().getCommand(
          userCommand.path,
          true,
          userCommand,
        );
      }
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
     * @param {specialists} specialists
     * @param {officeUserId} officeUserId
     */
  createOfficeUserSpecialists(
    specialists: CreateUser['specialists'],
    officeUserId: string,
  ) {
    interface SpecialistArray {
      user_id: string;
      specialists_id: object;
    }
    const specialistArr: Array<SpecialistArray> = [];
    specialists.map((specialist) => {
      specialistArr.push({
        user_id: officeUserId,
        specialists_id: specialist,
      });
    });
    if (specialistArr.length) {
      OfficeUserSpecialistsSchema.insertMany(specialistArr)
        .then(async (doc: object) => {
          return doc;
        })
        .catch((error: any) => {
          return error.message;
        });
    }
  }
  /**
     * @param {dayOfTheWeek} dayOfTheWeek
     * @param {officeUserId} officeUserId
     */
  async createOfficeUserWeekday(
    dayOfTheWeek: CreateUser['day_of_the_week'],
    officeUserId: string,
  ) {
    interface WeekdaysArray {
      user_id: string;
      weekdays_id: object;
    }
    const weekdaysArr: Array<WeekdaysArray> = [];
    dayOfTheWeek.map((weekday) => {
      weekdaysArr.push({
        user_id: officeUserId,
        weekdays_id: weekday,
      });
    });
    if (weekdaysArr.length) {
      await OfficeUserWeekDaysSchema.insertMany(weekdaysArr)
        .then(async (doc: object) => {
          return doc;
        })
        .catch((error: any) => {
          return error.message;
        });
    }
  }

  /**
     *
     * @param {data} data GetUsers Command
     * @return {Object}
     * All the back office Users
     */
  async getUsers(data: GetUsers) {
    try {
      const skip = (data.page - 1) * data.perPage;
      const limit = data.perPage;

      let sort = (data.sort == 'DESC') ? -1 : 1;

      const search = data.search.replace(/\s+/g, ' ').trim();
      const searchQry = {};

      if (data.search != '') {
        Object.assign(searchQry, {
          $or: [
            {
              'user_data.first_name': {
                $regex: `.*${search}.*`,
                $options: 'i',
              },
            },
            {
              'user_data.last_name': { $regex: `.*${search}.*`, $options: 'i' },
            },
            { 'role_data.name': { $regex: `.*${search}.*`, $options: 'i' } },
            { email: { $regex: `.*${search}.*`, $options: 'i' } },
            {
              $expr: {
                $regexMatch: {
                  input: {
                    $concat: [
                      '$user_data.first_name',
                      ' ',
                      '$user_data.last_name',
                    ],
                  },
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
        if (data.column === 'role_name') {
          column = 'role_data.name';
        } else {
          column = data.column;
        }
        Object.assign(sortQuery, {
          [column]: sort
        });
      } else {
        Object.assign(sortQuery, {
          'user_data.first_name': sort
        });
      }
      return await UserSchema.aggregate([
        { $match: { user_type: 1 } },
        {
          $lookup: {
            from: 'office_users',
            let: { id: '$_id' },
            pipeline: [{ $match: { $expr: { $eq: ['$user_id', '$$id'] } } }],
            as: 'user_data',
          },
        },
        { $unwind: { path: '$user_data', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'roles',
            localField: 'role_id',
            foreignField: '_id',
            as: 'role_data',
          },
        },
        { $unwind: { path: '$role_data', preserveNullAndEmptyArrays: true } },
        { $match: searchQry },
        { $sort: sortQuery },
        {
          $facet: {
            paginated_results: [
              {
                $skip: skip,
              },
              { $limit: limit },
              {
                $project: {
                  id: 1,
                  email: 1,
                  status: 1,
                  first_name: 1,
                  last_name: 1,
                  role_name: '$role_data.name',
                  img_unique_name: '$user_data.img_unique_name'
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
        .collation({ locale: 'en', strength: 1 })
        .allowDiskUse(true)
        .then(async (usersData: IUsersResponseData[]) => {
          let users: IUsers[] = usersData[0].paginated_results;
          const usersCount: number =
            usersData[0].total_count &&
              usersData[0].total_count[0] &&
              usersData[0].total_count[0].count ?
              usersData[0].total_count[0].count :
              0;
          let usersArr: any = [];
          if (users.length) {
            users.map((user) => {
              let userObj: any = {};
              userObj = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role_name: user.role_name,
                status: user.status,
                display_url: user.img_unique_name ? environment.api_base_url + user.img_unique_name : '',
              };
              usersArr.push(userObj);
            });
          }
          return { result: usersArr, count: usersCount };
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
     * @param {data} data GetUserDetails Command
     * @return {Object}
     * Get Single User based on User Id
     */
  async getUserDetails(data: GetUserDetails) {
    try {
      return await UserSchema.aggregate([
        { $match: { _id: ObjectId(data.id) } },
        {
          $lookup: {
            from: 'office_users',
            let: { id: '$_id' },
            pipeline: [{ $match: { $expr: { $eq: ['$user_id', '$$id'] } } }],
            as: 'user_data',
          },
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'role_id',
            foreignField: '_id',
            as: 'role_data',
          },
        },
        { $unwind: { path: '$user_data', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            id: 1,
            email: 1,
            status: 1,
            user_type: 1,
            acuity_calendar_id: 1,
            office_user_id: '$user_data._id',
            specialists: '$user_data.specialists',
            day_of_the_week: '$user_data.day_of_the_week',
            first_name: '$user_data.first_name',
            last_name: '$user_data.last_name',
            phone: '$user_data.phone',
            zoom_link: '$user_data.zoom_link',
            qualifications: '$user_data.qualifications',
            background: '$user_data.background',
            experience: '$user_data.experience',
            time_zone: '$user_data.time_zone',
            allocation: '$user_data.allocation',
            role_name: '$role_data.name',
            role_id: '$role_data._id',
            code: '$role_data.code',
            img_name: '$user_data.img_unique_name',
            display_url: '$user_data.img_unique_name' ?
              {
                $concat: [
                  environment.api_base_url,
                  '',
                  '$user_data.img_unique_name',
                ],
              } :
              '',
          },
        },
      ])
        .then(async (user: IUser[]) => {
          if (user && user[0]) {
            const weekdaysArr: any = [];

            await WeekDaySchema.find(
              {},
              { _id: 1, value: '$_id', label: '$name' },
            ).then((weekdays: any) => {
              weekdays.map((weekday) => {
                weekdaysArr[weekday._id] = weekday;
              });
            });

            if (user[0] && user[0].role_name[0]) {
              user[0].role_name = user[0].role_name[0];
            }
            if (user[0] && user[0].role_id[0]) {
              user[0].role_id = user[0].role_id[0];
            }
            if (user[0] && user[0].code[0]) {
              user[0].code = user[0].code[0];
            }

            const weekdaysData: any = [];
            if (user[0] && user[0].day_of_the_week) {
              user[0].day_of_the_week.map((weekday) => {
                if (weekdaysArr[weekday]) {
                  weekdaysData.push(weekdaysArr[weekday]);
                }
              });
              user[0].day_of_the_week = weekdaysData;
            }
            return user[0];
          } else {
            throw new ResourceNotFound('No User Found', '');
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
     * @param {data} data UpdateUser Command
     * @return {Object}
     * Update User Details
     */
  async updateUser(data: UpdateUser) {
    try {
      let experience: IExperience | null = {} as IExperience;
      let timeZone: ITimeZone | null = {} as ITimeZone;
      // Update User Schema
      await UserSchema.findByIdAndUpdate(
        data.id,
        {
          status: data.status,
          first_name: data.first_name,
          last_name: data.last_name,
          img_file_name: data.img_file_name,
          img_unique_name: data.img_unique_name,
          last_modified_by: data.last_modified_by,
          last_modified_date: data.last_modified_date
        },
        { new: true },
      )
        .then((doc) => {
          return doc;
        })
        .catch((error: any) => {
          return error;
        });

      if (data.experience) {
        experience = await ExperienceSchema.findById(data.experience, {
          value: '$_id',
          name: 1,
          label: '$name',
        }).then((experience) => experience);
      }

      // TimeZone
      if (data.time_zone) {
        timeZone = await TimeZoneSchema.findById(data.time_zone, {
          _id: 1,
          value: '$_id',
          name: 1,
          label: '$name',
          offset_value: 1,
          code: 1,
          utc_offset: 1,
          gmt_offset: 1,
        }).then((zone) => zone);
      }
      const roleData = await RoleSchema.findById(ObjectId(data.role_id))
        .select({ code: 1 })
        .then((role) => role);

      let available = 0;
      if (roleData != null) {
        if (roleData.code === 'md') {
          available = Number(data.allocation) * 3;
        }
        if (roleData.code === 'health_coach') {
          available = Number(data.allocation);
        }
        const assignedClient = await ClientAssignmentSchema.find({
          assignment_user_id: data.id,
          type: roleData.code,
        }).countDocuments();
        available = available - assignedClient;
        available = available >= 0 ? available : 0;
      }

      // Update Office User Schema
      const officeUserData = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        img_file_name: data.img_file_name,
        img_unique_name: data.img_unique_name,
        is_admin: data.is_admin,
        zoom_link: data.zoom_link,
        qualifications: data.qualifications,
        background: data.background,
        experience: experience,
        time_zone: timeZone,
        allocation: data.allocation,
        available: available,
        specialists: data.specialists,
        day_of_the_week: data.day_of_the_week,
        last_modified_by: data.last_modified_by,
        last_modified_date: data.last_modified_date
      };
      const updateOption = {
        new: true,
        upsert: true,
        rawResult: true,
      };
      const officeUser = await OfficeUserSchema.findOneAndUpdate(
        { user_id: data.id },
        { $set: officeUserData },
        updateOption,
      );
      if (officeUser) {
        if (officeUser._id && data.specialists) {
          // Delete Specialists
          //   OfficeUserSpecialistsSchema.deleteMany(
          //       {user_id: officeUser._id},
          //       function(err, d) {
          //         if (err) {
          //           console.log(err);
          //         }
          //       },
          //   );
          OfficeUserSpecialistsSchema.deleteMany({
            user_id: officeUser._id,
          }).then((u) => u);
          // Creates Specialists
          this.createOfficeUserSpecialists(data.specialists, officeUser._id);
        }
        if (officeUser._id && data.day_of_the_week) {
          // Delete Weekdays
          //   OfficeUserWeekDaysSchema.deleteMany(
          //       {user_id: office_user._id},
          //       function(err) {
          //         if (err) console.log(err);
          //       },
          //   );
          OfficeUserWeekDaysSchema.deleteMany({
            user_id: officeUser._id,
          }).then(
            (u) => u,
          );
          // Creates Weekdays
          this.createOfficeUserWeekday(data.day_of_the_week, officeUser._id);
        }
      }
      const userCommand = new GetUserDetails({ params: { id: data.id } });
      return await new CommandFactory().getCommand(
        userCommand.path,
        true,
        userCommand,
      );
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }

  /**
    *
    * @param {data} data DeleteProfilePicture Command
    * @return {Object}
    * Delete user profile picture
    */
  async deleteProfilePicture(data: DeleteProfilePicture) {
    await OfficeUserSchema.findOneAndUpdate(
      { user_id: data.id },
      { img_file_name: '', img_unique_name: '' },
      { new: true },
    );
    return 'Profile picture deleted Successfully';
  }
}
