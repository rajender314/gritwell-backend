import {GetRoleBasedUsers}
  from '@basePath/OfficeClients/Commands/GetRoleBasedUsers';
import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
import {
  ResourceNotFound,
  ResourceRecordNotFound,
} from '@basePath/Exceptions/ResourceNotFound';
import {WeekDaySchema}
  from '@basePath/Admin/DataSource/Models/Schema/WeekDaySchema';
import {SpecialistSchema}
  from '@basePath/Admin/DataSource/Models/Schema/SpecialistSchema';

import {IRoleUsersReponseData}
  from '@basePath/OfficeClients/Interfaces/IRoleUsersReponseData';
import {IRoleUsers} from '@basePath/OfficeClients/Interfaces/IRoleUsers';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
const environment = process.env;
/**
 * class RoleUsersDataSource
 */
export default class RoleUsersDataSource {
  /**
      * @param {data} data GetRoleBasedUsers
     * @return {Object} users based on slug
     */
  async getUsers(data: GetRoleBasedUsers) {
    const slug = ['health_coach', 'md'];
    if (!slug.includes(data.slug)) {
      throw new ResourceRecordNotFound('Invalid Slug', '');
    }
    try {
      const skip = (data.page - 1) * data.perPage;
      const limit = data.perPage;
      
      const search = data.search ? data.search.trim() : data.search;
      
      const searchQry = {};
      const project = {};

      if (data.search != '') {
        Object.assign(searchQry, {
          $or: [
            {'user_data.first_name': {$regex: `.*${search}.*`, $options: 'i'}},
            {'user_data.last_name': {$regex: `.*${search}.*`, $options: 'i'}},
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

      const filterQuery = {};
      if (data.slug === 'health_coach') {
        if (data.specialists != '') {
          const specialistsArr = data.specialists.split(',');
          if (specialistsArr.length) {
            Object.assign(filterQuery, {
              'user_data.specialists': {$in: specialistsArr},
            });
          }
        }
        if (data.timezone != '') {
          const timezones = data.timezone.split(',');
          const timezoneArr = timezones.map((s) => ObjectId(s));
          Object.assign(filterQuery, {
            'user_data.time_zone._id': {$in: timezoneArr},
          });
        }
        if (data.experience != '') {
          const experiences = data.experience.split(',');
          const experienceArr = experiences.map((s) => ObjectId(s));
          Object.assign(filterQuery, {
            'user_data.experience._id': {$in: experienceArr},
          });
        }
      }

      if (data.slug === 'md') {
        if (data.weekdays != '') {
          const weekdaysArr = data.weekdays.split(',');
          if (weekdaysArr.length) {
            Object.assign(filterQuery, {
              'user_data.day_of_the_week': {$in: weekdaysArr},
            });
          }
        }
      }
      // Lookup and Project for Health Coach
      if (data.slug === 'health_coach') {
        Object.assign(project, {
          id: 1,
          office_user_id: '$user_data._id',
          first_name: '$user_data.first_name',
          last_name: '$user_data.last_name',
          experience: '$user_data.experience',
          time_zone: '$user_data.time_zone',
          available: '$user_data.available',
          specialists: '$user_data.specialists',
          img_name: '$user_data.img_unique_name',
          display_url: '$user_data.img_unique_name' ?
             {
               $concat: [
                 environment.api_base_url,
                 '',
                 '$user_data.img_unique_name',
               ],
             } : '',
        });
      }

      // Lookup and Project for MD
      if (data.slug === 'md') {
        Object.assign(project, {
          id: 1,
          office_user_id: '$user_data._id',
          first_name: '$user_data.first_name',
          last_name: '$user_data.last_name',
          available: '$user_data.available',
          day_of_the_week: '$user_data.day_of_the_week',
          img_name: '$user_data.img_unique_name',
          display_url: '$user_data.img_unique_name' ?
             {
               $concat: [
                 environment.api_base_url,
                 '',
                 '$user_data.img_unique_name',
               ],
             } : '',
        });
      }

      return await UserSchema
          .aggregate([
            {$match: {'user_type': 1, 'status': true}},
            {
              $lookup:
            {
              from: 'office_users',
              let: {id: '$_id'},
              pipeline: [
                {$match: {$expr: {$eq: ['$user_id', '$$id']}}},
              ],
              as: 'user_data',
            },
            },
            {
              $lookup: {
                'from': 'roles',
                'localField': 'role_id',
                'foreignField': '_id',
                'as': 'role_data',
              },
            },
            {$unwind: {path: '$user_data', preserveNullAndEmptyArrays: true}},
            {$match: {'role_data.code': data.slug}},
            // {$match: {'user_data.available': {$gt: 0}}},
            {$match: searchQry},
            {$match: filterQuery},
            // {$sort: {'user_data.first_name': sort}},
            {$sort: {'user_data.available': -1}},
            {
              $facet: {
                paginated_results: [
                  {$skip: skip},
                  {$limit: limit},
                  {$project: project},
                ],
                total_count: [
                  {$count: 'count'},
                ],
              },
            },
          ]).then(async (usersData: IRoleUsersReponseData[]) => {
            let users: IRoleUsers[] = usersData[0].paginated_results;
            const usersCount: number = usersData[0].total_count &&
            usersData[0].total_count[0] &&
            usersData[0].total_count[0].count ?
            usersData[0].total_count[0].count :
            0;
            if (users.length) {
              if (data.slug == 'health_coach') {
                users = await this.healthCoachDetails(users);
              }
              if (data.slug == 'md') {
                users = await this.mdDetails(users);
              }
            }
            return {result: users, count: usersCount};
          })
          .catch(async (error: any) => {
            return {success: false, message: error.message};
          });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
 * @param {users} users
 * @return {Object}
 */
  async healthCoachDetails(users: IRoleUsers[]) {
    const specialistsArr: {
      [key: string]: string
    } = {};

    await SpecialistSchema.find({}).then((specialists) => {
      specialists.map((specialist) => {
        specialistsArr[specialist._id] = specialist.name;
      });
    });
    return users.map((user) => {
      const specialistsData: Array<string> = [];
      if (user.specialists) {
        user.specialists.map((specialist) => {
          if (specialistsArr[specialist]) {
            specialistsData.push(specialistsArr[specialist]);
          }
        });
        user.specialists = specialistsData.join(', ');
      }
      return user;
    });
  }
  /**
 * @param {users} users
 * @return {Object}
 */
  async mdDetails(users: IRoleUsers[]) {
    const weekdaysArr: {
      [key: string]: string
    } = {};
    await WeekDaySchema.find({}).then((weekdays) => {
      weekdays.map((weekday) => {
        weekdaysArr[weekday._id] = weekday.name;
      });
    });
    return users.map((user) => {
      if (user.day_of_the_week) {
        const weekdaysData: Array<string> = [];
        user.day_of_the_week.map((weekday) => {
          if (weekdaysArr[weekday]) {
            weekdaysData.push(weekdaysArr[weekday]);
          }
        });
        user.day_of_the_week = weekdaysData.join(', ');
      }
      return user;
    });
  }
}
