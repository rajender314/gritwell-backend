import AWS from 'aws-sdk';
require('dotenv').config();
const environment = process.env;
/**
 * class MyMailer
 */
export default class MyMailer {
  /**
   * constructor
   */
  constructor() {}

  /**
  * @param {mailData} mailData
  */
  public async send(mailData:any) {
    try {
      /**
       * AWS SES CODE START
       */
      const SesConfig = {
        accessKeyId: environment.AWS_ACCESS_KEY_ID,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
        region: environment.AWS_REGION,
      };
      const sourceEmail = environment.AWS_SES_SOURCE ?
      environment.AWS_SES_SOURCE :
      '';
      // const sourceEmail:string = environment.AWS_SES_SOURCE ?
      // environment.AWS_SES_SOURCE :'tech@grit-well.com'

      const AwsSes = new AWS.SES(SesConfig);
      const params = {
        Destination: {
          CcAddresses: [],
          ToAddresses: [
            mailData.to,
          ],
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: 'UTF-8',
              Data: mailData.html,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: mailData.subject,
          },
        },
        Source: sourceEmail,
        ReplyToAddresses: [],
      };
      const sendPromise = AwsSes.sendEmail(params).promise();

      // Handle promise's fulfilled/rejected states
      sendPromise.then(
          function(data) {
            console.log('email is sent, AWS SES Id-->', data.MessageId);
            return data;
          }).catch(
          function(err) {
            console.error(err, err.stack);
            return err;
          });
      // Below code used for sending emails using node mailer
      // this.nodemailer.sendMail(mailData, (error, info) => {
      //   if (error) {
      //     console.log(error);
      //     // res.json(error);
      //     return error;
      //   }
      //   console.log('email is send');
      //   // res.json(info)
      //   return info;
      // });
    } catch (error) {
      console.log(error);
    }
  }
}

// export {MyMailer};
