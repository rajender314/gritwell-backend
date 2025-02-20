// import {Logger} from '@src/rapidium-core/src/Helpers/Logger';
// import {myconsole} from '../../Helpers/myconsole';
// const {networkInterfaces} = require('os');
/**
 * class DomainException
 */
export class DomainException extends Error {
  public errorCode: number;
  public ipAddress: any;
  /**
 * constructor
 * @param {message} message
 * @param {errorCode} errorCode
 */
  constructor(message:any, errorCode:any) {
    super(message);
    this.errorCode = errorCode ? errorCode : 500;
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential,
    // but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    // Error.captureStackTrace(this, this.constructor);
    // this.ipAddress = getClientIP();
    // Logger.saveLog(this);
  }
}
/**
 * @return {Object}
 */
// function getClientIP() {
//   const nets = networkInterfaces();
//   const results = Object.create({}); // Or just '{}', an empty object

//   for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//       // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//       if (net.family === 'IPv4' && !net.internal) {
//         if (!results[name]) {
//           results[name] = [];
//         }
//         results[name].push(net.address);
//       }
//     }
//   }
//   return results.enp1s0[0] ? results.enp1s0[0] : '127.0.0.1';
// }
