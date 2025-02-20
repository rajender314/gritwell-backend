import {CommandFactory} from '../Commands/CommandFactory';
import BaseResponse from '../DataTransformers/BaseResponse';
import {DomainException} from '../Exceptions/DomainException';
// import {Logger} from '@src/rapidium-core/src/Helpers/Logger';

require('dotenv').config();
const env = process.env;
/**
 * class BaseController
 */
export default class BaseController {
  /**
    * @param {command} command
   * @param {data} data
   * @param {res} res
   * @param {successMsg} successMsg
   * @param {faliedMsg} faliedMsg
   * @param {next} next
   * @param {req} req
   */
  async run(
      command: string,
      data: object,
      res:any,
      successMsg: boolean,
      faliedMsg: boolean,
      next:any,
      req:any,
  ) {
    let arrResponse;
    try {
      const cmndFactory = new CommandFactory();
      const finalResult = await cmndFactory.getCommand(
          command,
          successMsg,
          data,
      );
      // var arrResponse;
      if (finalResult.isMiddlewarePassed) {
        arrResponse = finalResult;
      } else {
        arrResponse = new BaseResponse(
            finalResult,
            successMsg,
            200,
            'Successful',
        );
      }
    } catch (err:any) {
      err.ipAddress = req.connection.remoteAddress ?
        req.connection.remoteAddress :
        '127.0.0.1';
      // Logger.saveLog(err);
      if (err instanceof DomainException) {
        arrResponse = new BaseResponse(
            err.message,
            faliedMsg,
            err.errorCode,
            err.message,
        );
      } else {
        if (env.APP_ENV == 'local') {
          arrResponse = new BaseResponse(err.message, faliedMsg, 402, 'Error');
        } else {
          arrResponse = new BaseResponse(
              'Internal Server Error',
              faliedMsg,
              500,
              'Error',
          );
        }
      }
    } finally {
      if (arrResponse && arrResponse.isMiddlewarePassed) {
        if (arrResponse.decoded) {
          req.decoded = arrResponse.decoded;
        }
        next();
      } else {
        arrResponse.formatMessage().then((result:any) => {
          res.json(result);
        });
      }
    }
  }
}
