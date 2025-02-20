import {ObjectId} from '@rapCore/src/Mongodb/Types';
/**
 * class BaseModel
 */
export default class BaseModel {
  private model: any;
  /**
   * constructor
   * @param {ModelName} ModelName
   */
  constructor(ModelName:any) {
    this.model = ModelName;
  }
  /**
    * @param {req} req
   * @return {Object}
   */
  public getAll(req:any) {
    const query = {};
    if (req.search) {
      query['name'] = new RegExp(req.search, 'i');
    }
    if (req.status) {
      const status=[true];
      // if(req.status){
      // status=[true];
      // }
      query['status']={$in: status};
    }
    const options = {
      sort: {[req.sortkey]: req.sortby},
      page: req.page,
      limit: req.limit,
    };
    return this.model
    // .find(query)
        .paginate(query, options)
        .then(async (docs: object) => {
          if (docs) {
            return docs;
          } else {
            return 'No Records Found';
          }
        })
        .catch((error: any) => {
          return error;
        });
  }
  /**
    * @param {req} req
   * @return {Object}
   */
  public checkUnique(req) {
    const query={name: req.name};
    return this.model
        .findOne(query)
        .then(async (doc: object) => {
          if (doc) {
            return doc;
          } else {
            return false;
          }
        })
        .catch((error: any) => {
          return error;
        });
  }
  /**
    * @param {data} data
   * @return {Object}
   */
  public getOne(data: object) {
    return this.model
        .findById(ObjectId(data['id']))
        .then(async (doc: object) => {
          if (doc) {
            return doc;
          } else {
            return 'No Records Found';
          }
        })
        .catch((error: any) => {
          return error;
        });
  }
  /**
    * @param {req} req
   * @return {Object}
   */
  public addUpdate(req:any) {
    if (req.id) {
      return this.updateOne(req);
    } else {
      return this.createOne(req);
    }
  }
  /**
    * @param {req} req
   * @return {Object}
   */
  public createOne(req:any) {
    return this.model
        .create(req)
        .then(async (doc: object) => {
          return doc;
        })
        .catch((error: any) => {
          return error.message;
        });
  }
  /**
    * @param {data} data
   * @return {Object}
   */
  public updateOne(data: object) {
    return this.model
        .findByIdAndUpdate(data['id'], data, {new: true})
        .then(async (doc: object) => {
          return doc;
        })
        .catch((error: any) => {
          return error;
        });
  }
  /**
    * @param {data} data
   * @return {Object}
   */
  public deleteOne(data: object) {
    return this.model
        .findByIdAndDelete(data['id'])
        .then(async (doc: object) => {
          return {success: true, status_code: 200};
        })
        .catch((error: any) => {
          return error;
        });
  }
  /**
    * @param {req} req
   * @return {Object}
   */
  public insertMany(req:any) {
    return this.model
        .insertMany(req)
        .then(async (doc: object) => {
          return doc;
        })
        .catch((error: any) => {
          console.log(error.message);
          return error.message;
        });
  }
}
