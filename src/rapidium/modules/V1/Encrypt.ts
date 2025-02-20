import * as crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
/**
 * Class StrEncrypt
 */
class StrEncrypt {
  /**
   * constructor
   */
  constructor() {
  }
  /**
 *
 * @param {text} text
 * @return {Object}
 */
  public encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex') + ':' + iv.toString('hex') + '=' +
        key.toString('hex');
    // returns encryptedData:iv=key
  }
  /**
     * @param {text} text
     * @return {Object}
     */
  public decrypt(text) {
    const iv = Buffer.
        from((text.split(':')[1]).split('=')[0], 'hex');// will return iv;
    const enKey = Buffer.
        from(text.split('=')[1], 'hex');// will return key;
    const encryptedText = Buffer.
        from(text.split(':')[0], 'hex');// returns encrypted Data
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(enKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
    // returns decryptedData
  }
}
export {StrEncrypt};
