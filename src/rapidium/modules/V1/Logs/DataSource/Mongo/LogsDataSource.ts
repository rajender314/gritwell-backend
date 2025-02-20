import {env} from 'process';
import Logs from '../Models/Logs';
// import {myconsole} from '@src/rapidium-core/src/Helpers/myconsole';

let message: string = '';
/**
 * DataSource file for LogsDataSource
 */
export default class LogsDataSource {
  /**
   * @param {data} data
   * @return {object}
   */
  async addLog(data: any) {
    data.response = getLog();
    message = '';
    if (env.LOG_ENABLE === 'no') {
      return {
        message: 'logs not saved',
        success: false,
      };
    }
    return new Logs().addUpdate(data).then((doc:any) => {
      return {
        message: 'logs saved',
        success: true,
      };
    });
  }
  /**
   * @param {data} data
   * @return {object}
   */
  async updateLog(data: any) {
    data.response = getLog();
    message = '';
    if (env.LOG_ENABLE === 'no') {
      return {
        message: 'logs not updated',
        success: false,
      };
    }
    return new Logs().addUpdate(data).then((doc:any) => {
      return {
        message: 'logs updated',
        success: true,
      };
    });
  }
}
/**
 *
 * @param {msg} msg
 * @return {Boolean}
 */
export function setLog(msg: string) {
  message += msg + '\n';
  return true;
}
/**
 *
 * @return {String}
 */
export function getLog() {
  return message;
}
