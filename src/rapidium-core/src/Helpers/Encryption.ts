const CryptoJS = require('crypto-js');
require('dotenv').config();
const env = process.env;
/**
 * class Encryption
 */
export default class Encryption {
/**
 * @param {data} data
 * @return {Object}
 */
  public encode(data:any) {
    const key=env.AES_KEY;

    return CryptoJS
        .AES
        .encrypt(data, key, {mode: CryptoJS.mode.ECB})
        .toString();
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public decode(data:any) {
    const key=env.AES_KEY;
    const bytes = CryptoJS.AES.decrypt(data, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  /**
 * @param {data} data
 * @return {Object}
 */
  public pwd_encode(data:any) {
    const key=CryptoJS.enc.Utf8.parse(env.AES_KEY);
    return CryptoJS
        .AES
        .encrypt(data, key, {mode: CryptoJS.mode.ECB})
        .toString();
  }
}
