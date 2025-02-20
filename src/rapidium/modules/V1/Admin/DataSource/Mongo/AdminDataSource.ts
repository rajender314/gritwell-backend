import User from '@basePath/Admin/DataSource/Models/User';
import {UserSchema} from '@basePath/Admin/DataSource/Models/Schema/UserSchema';
// import {CustomerSchema}
// from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';
import LogsDataSource from '@basePath/Logs/DataSource/Mongo/LogsDataSource';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
import {ObjectId} from '@rapCore/src/Mongodb/Types';

const environment = process.env;
/**
 * class AdminDataSource
 */
export default class AdminDataSource {
  /**
   * @param {data} data
   * @return {Object}
   */
  async createUser(data: any) {
    return new User(UserSchema).create(data);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async updateUser(data: any) {
    return new User(UserSchema).update(data);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getUser(data: any) {
    const logParams: any = {};
    logParams.name = 'fetching Users';
    logParams.table_name = 'users';
    logParams.action = 'get users api';
    logParams.params = JSON.stringify(data);
    try {
      let collectionName = 'office_users';
      if (data.user_type == 2) {
        collectionName = 'customers';
      }
      // geting single user details
      if (data.id != '') {
        const users = await UserSchema.aggregate([
          {$match: {_id: ObjectId(data.id), status: true}},
          {
            $lookup: {
              from: collectionName,
              let: {id: '$_id'},
              pipeline: [
                {$match: {$expr: {$eq: ['$user_id', '$$id']}}},
                {
                  $lookup: {
                    from: 'roles',
                    let: {id: '$role_id'},
                    pipeline: [
                      {
                        $match: {
                          $expr: {$eq: ['$_id', '$$id']},
                        },
                      },
                    ],
                    as: 'role_data',
                  },
                },
              ],
              as: 'user_data',
            },
          },
          {$unwind: {path: '$user_data', preserveNullAndEmptyArrays: true}},
          {
            $project: {
              id: 1,
              email: 1,
              is_password_updated: 1,
              status: 1,
              user_data: 1,
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
        ]);
        return users;
      }

      if (data.user_type == 1) {
        const users = await this.getOffiecUsersQuery(data);
        logParams.response = 'fetching users successull';
        new LogsDataSource().addLog(logParams);
        return users;
      } else {
        const users = await this.getCustomersQuery(data);
        logParams.response = 'fetching users successull';
        new LogsDataSource().addLog(logParams);
        return users;
      }
    } catch (err: any) {
      logParams.response = err.message;
      new LogsDataSource().addLog(logParams);
      throw new ResourceNotFound(
          'Something is went wrong, Please try again later',
          '');
    }
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getOffiecUsersQuery(data: any) {
    const skip = (data.page - 1) * data.perPage;
    const limit = data.perPage;
    let sort = 1;
    // const column = 'user_data.'.concat(data.column);
    // let status = true;
    const search = data.search ?
    data.search.trim() :
    data.search;

    // getting all users details
    // if (data.status == 'false' || data.status == false) {
    //   status = false;
    // }
    if (data.sort == 'desc') {
      sort = -1;
    }

    const searchQry = {};

    if (data.search != '') {
      Object.assign(searchQry, {
        $or: [
          {
            'user_data.first_name': {$regex: `.*${search}.*`, $options: 'i'},
          },
          {
            'user_data.lasat_name': {$regex: `.*${search}.*`, $options: 'i'},
          },
          {
            'user_data.role_data.name': {
              $regex: `.*${search}.*`,
              $options: 'i',
            },
          },
          {email: {$regex: `.*${search}.*`, $options: 'i'}},
        ],
      });
    }
    return await UserSchema.aggregate([
      {$match: {user_type: 1}},
      {
        $lookup: {
          from: 'office_users',
          let: {id: '$_id'},
          pipeline: [
            {
              $match: {$expr: {$eq: ['$user_id', '$$id']}, is_admin: false},
            },
            {
              $lookup: {
                from: 'roles',
                let: {id: '$role_id'},
                pipeline: [
                  {
                    $match: {
                      $expr: {$eq: ['$_id', '$$id']},
                    },
                  },
                ],
                as: 'role_data',
              },
            },
          ],
          as: 'user_data',
        },
      },
      {$unwind: {path: '$user_data', preserveNullAndEmptyArrays: true}},
      {$match: {'user_data.is_admin': false}},
      {$match: searchQry},
      {$sort: {'user_data.first_name': sort}},
      {
        $facet: {
          paginatedResults: [
            {
              $skip: skip,
            },
            {$limit: limit},
            {
              $project: {
                id: 1,
                email: 1,
                status: 1,
                user_data: 1,
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
          ],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ]);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async getCustomersQuery(data: any) {
    const skip = (data.page - 1) * data.perPage;
    const limit = data.perPage;
    let sort = 1;
    // const column = 'user_data.'.concat(data.column);
    // let status = true;
    const search = data.search ? data.search.trim() : data.search;

    // getting all users details
    // if (data.status == 'false' || data.status == false) {
    //   status = false;
    // }
    if (data.sort == 'desc') {
      sort = -1;
    }

    const searchQry = {};

    if (data.search != '') {
      Object.assign(searchQry, {
        $or: [
          {'user_data.first_name': {$regex: `.*${search}.*`, $options: 'i'}},
          {'user_data.lasat_name': {$regex: `.*${search}.*`, $options: 'i'}},
          {email: {$regex: `.*${search}.*`, $options: 'i'}},
        ],
      });
    }
    return await UserSchema.aggregate([
      {$match: {user_type: 2}},
      {
        $lookup: {
          from: 'customers',
          let: {id: '$_id'},
          pipeline: [{$match: {$expr: {$eq: ['$user_id', '$$id']}}}],
          as: 'user_data',
        },
      },
      {$unwind: {path: '$user_data', preserveNullAndEmptyArrays: true}},
      {$match: searchQry},
      {$sort: {'user_data.first_name': sort}},
      {
        $facet: {
          paginatedResults: [
            {
              $skip: skip,
            },
            {$limit: limit},
            {
              $project: {
                id: 1,
                email: 1,
                status: 1,
                user_data: 1,
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
          ],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ]);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async remove(data: any) {
    return await new User(UserSchema).remove(data);
  }
  /**
   * @param {data} data
   * @return {Object}
   */
  async changePassword(data: any) {
    return await new User(UserSchema).changePassword(data);
  }
}
