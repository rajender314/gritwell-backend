
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
// eslint-disable-next-line
import {CustomerSubscriptionHistorySchema} from '@basePath/Subscriptions/DataSource/Models/Schema/CustomerSubscriptionHistory';
import {PaymentHistory} from '@basePath/Customer/Commands/PaymentHistory';
import {DownloadPaymentHistory}
  from '@basePath/Customer/Commands/DownloadPaymentHistory';
import {GetPaymentDetails} from '@basePath/Customer/Commands/GetPaymentDetails';

import {DownloadPaymentDetails}
  from '@basePath/Customer/Commands/DownloadPaymentDetails';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import moment from 'moment';

const fs = require('fs');
const environment = process.env;
const Pdfmake = require('pdfmake');
/**
 * class CustomerPaymentHistoryDataSource
 */
export default class CustomerPaymentHistoryDataSource {
  /**
     * @param {data} data
     * @return {Object}
     */
  async paymentHistory(data:PaymentHistory) {
    // const userId =
    //   data && data.userData && data.userData.user_id ?
    //     data.userData.user_id :
    //     '';

    const userId:string = data.userId;
    try {
      if (userId != null && userId != '') {
        return await CustomerSubscriptionHistorySchema.aggregate([
          {
            $match: {
              'user_id': ObjectId(userId),

            },
          },
          {
            $lookup: {
              from: 'customer_cards',
              localField: 'stripe_card_id',
              foreignField: 'stripe_card_id',
              as: 'cards_data',
            },
          },
          {
            $unwind: {
              path: '$cards_data',
              preserveNullAndEmptyArrays: true,
            },
          },

          {$sort: {_id: -1}},
          {
            $facet: {
              paginated_results: [
                {
                  $project: {
                    amount: 1,
                    created_date: 1,
                    transaction_type: 1,
                    user_id: 1,
                    appointment_type: 1,
                    stripe_card_id: 1,
                    card_number: '$cards_data.card_number',
                    card_brand: '$cards_data.card_brand',
                    payment_status: 1,
                    order_id: 1,
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

        ]).then(async (paymentsData:any)=>{
          const payments = paymentsData[0].paginated_results;

          const paymentsCount: number =
                        paymentsData[0].total_count &&
                        paymentsData[0].total_count[0] &&
                        paymentsData[0].total_count[0].count ?
                        paymentsData[0].total_count[0].count :
                            0;
          return {result: payments, count: paymentsCount};
        }).catch(async (error: any) => {
          return {success: false, message: error.message};
        });
      } else {
        throw new ResourceNotFound('Please send me correct token', '');
      }
    } catch (error:any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
     * @param {data} data
     * @return {Object}
     */
  async downloadPaymentHistory(data:DownloadPaymentHistory) {
    try {
      const userId =
          data && data.userData && data.userData.user_id ?
            data.userData.user_id :
            '';

      const userEmail: string = data.userData.email;
      const formatedEmail: string = userEmail.substr(
          0,
          userEmail.lastIndexOf('@'),
      );


      const userCommand = new PaymentHistory({
        params: {
          userId: userId,
        },
      });
      const paymentHistyData:any = await new CommandFactory().getCommand(
          userCommand.path,
          true,
          userCommand,
      );
      if (paymentHistyData.result && paymentHistyData.result.length > 0) {
        const fileNamePath: string = await this.getPDFFileNamePath(
            'billing_history',
            formatedEmail,
        );
        const fonts = {
          Roboto: {
            normal: 'uploads/fonts/Poppins/Poppins-Regular.ttf',
            bold: 'uploads/fonts/Poppins/Poppins-Medium.ttf',
            italics: 'uploads/fonts/Poppins/Poppins-Italic.ttf',
            bolditalics: 'uploads/fonts/Poppins/Poppins-MediumItalic.ttf',
          },
        };
        if (fs.existsSync(fileNamePath)) {
          fs.unlink(fileNamePath, (error) => {});
        }

        const pdfmake = new Pdfmake(fonts);

        const content: any[] = [];
        paymentHistyData.result.forEach(async (rec:any)=>{
          const transactionType: string =
            rec.transaction_type === 'Subscription' ?
            'Subscription' :
            'Appointment Reschedule/Cancel';
          const cardImg = rec.card_brand && rec.card_brand === 'Visa' ?
            'uploads/cardsImages/visa.png' :
            'uploads/cardsImages/visa.png';
          const paymentDate = moment(rec.created_date).format('DD MMMM YYYY');

          content.push(
              {
                'columns': [
                  {
                    image: cardImg,
                    width: 30,
                    height: 30,
                  },
                  {
                    text: ` ${transactionType} \n ${paymentDate} \n\n`,
                    width: '*',
                  },
                  {
                    text: `$ ${rec.amount}`,
                    width: '10%',
                  },
                ], 'columnGap': 24,
              },

          );
        });

        const headerfooterDoc = {
          header: {
            margin: [0, 20, 0, 0],
            alignment: 'center',

            text: 'Gritwell',
            height: 100,

          },
          footer: {
            margin: [72, 0, 72, 0],
            fontSize: 10,
            columns: [{
              with: 'auto',
              alignment: 'center',
              text: '© GRITWELL 2022',
            },

            ],
          },
          content: content,
          styles: {
            columns: {
              border: '2px solid grey',
              padding: '5px',
            },
          },
          defaultStyle: {
            border: '2px solid grey',
            padding: '5px',
          },
          pageMargins: [72, 40, 72, 50],
        };

        const pdfDoc = pdfmake.createPdfKitDocument(headerfooterDoc, {});
        pdfDoc.pipe(fs.createWriteStream(fileNamePath));
        pdfDoc.end();

        const fileName = environment.api_base_url + fileNamePath;
        return fileName;
      } else {
        throw new ResourceNotFound('no data found', '');
      }
    } catch (error:any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
  /**
 * @param {typeData} typeData
 * @param {fileName} fileName
 * @return {String}
 */
  async getPDFFileNamePath(typeData: String, fileName: string) {
    const directoryPath = 'uploads/pdfs/'+moment().format('DD-MM-YYYY')+'/';

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, {recursive: true});
    }
    if (fileName != '') {
      return directoryPath +
      fileName +'_'+
      typeData +'_'+
      moment().unix() +
      '.pdf';
    } else {
      return directoryPath +
      typeData +'_'+
      moment().unix() +
      '.pdf';
    }
  }
  /**
     * @param {data} data
     * @return {Object}
     */
  async paymentDetails(data:GetPaymentDetails) {
    try {
      return await this.getPaymentInfo(data.id);
    } catch (error:any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
   *
   * @param {id} id
   * @return {Object}
   */
  async getPaymentInfo(id:string) {
    try {
      return await CustomerSubscriptionHistorySchema.aggregate([
        {
          $match: {
            _id: ObjectId(id),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_data',
          },
        },
        {
          $unwind: {
            path: '$user_data',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'subscription_plans',
            localField: 'subscription_plan_id',
            foreignField: '_id',
            as: 'plan_data',
          },
        },
        {
          $unwind: {
            path: '$plan_data',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'customer_cards',
            localField: 'stripe_card_id',
            foreignField: 'stripe_card_id',
            as: 'cards_data',
          },
        },
        {
          $unwind: {
            path: '$cards_data',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            amount: 1,
            created_date: 1,
            transaction_type: 1,
            user_id: 1,
            appointment_type: 1,
            stripe_card_id: 1,
            card_number: '$cards_data.card_number',
            card_brand: '$cards_data.card_brand',
            payment_status: 1,
            order_id: 1,
            plan_name: '$plan_data.plan_type',
            plan_recurring_type: '$plan_data.recurring_type',
            userName: {
              $concat: ['$user_data.first_name', ' ', '$user_data.last_name'],
            },
          },
        },
      ])
          .then(async (paymentsData: any) => {
            if (paymentsData && paymentsData.length > 0) {
              paymentsData[0].created_date = moment(
                  paymentsData[0].created_date,
              ).format('DD MMMM YYYY');
              return paymentsData[0];
            } else {
              throw new ResourceNotFound('No data found', '');
            }
          })
          .catch(async (error: any) => {
            throw new ResourceNotFound(error.message, '');
          });
    } catch (error:any) {
      throw new ResourceNotFound(error.message, '');
    }
  }

  /**
     * @param {data} data
     * @return {Object}
     */
  async downloadPaymentDetails(data:DownloadPaymentDetails) {
    try {
      const paymentInfo:any = await this.getPaymentInfo(data.id);
      if (paymentInfo && paymentInfo.amount) {
        const fileNamePath: string = await this.getPDFFileNamePath(
            'payment_details',
            '',
        );
        const fonts = {
          Roboto: {
            normal: 'uploads/fonts/Poppins/Poppins-Regular.ttf',
            bold: 'uploads/fonts/Poppins/Poppins-Medium.ttf',
            italics: 'uploads/fonts/Poppins/Poppins-Italic.ttf',
            bolditalics: 'uploads/fonts/Poppins/Poppins-MediumItalic.ttf',
          },
        };
        if (fs.existsSync(fileNamePath)) {
          fs.unlink(fileNamePath, (error) => {});
        }

        const pdfmake = new Pdfmake(fonts);
        const cardImg = paymentInfo.card_brand &&
          paymentInfo.card_brand === 'Visa' ?
         'uploads/cardsImages/visa.png' :
         'uploads/cardsImages/visa.png';

        const content: any[] = [
          {
            text: `${paymentInfo.created_date}`,
            width: '*',
            style: 'title',
          },
          {
            text: `Invoice`,
            width: '*',
            style: 'label',
          },
          {
            text: `#${paymentInfo.order_id}`,
            width: '*',
            style: 'text',
          },
          {
            text: `To`,
            width: '*',
            style: 'label',
          },
          {
            text: `#${paymentInfo.userName}`,
            width: '*',
            style: 'text',
          },
          {
            text: `Product`,
            width: '*',
            style: 'label',
          },
          {
            text: `${paymentInfo.plan_name} $${paymentInfo.amount}`,
            width: '*',
            style: 'text',
          },
          {
            text: `Total`,
            width: '*',
            style: 'label',
          },
          {
            text: `$${paymentInfo.amount}`,
            style: 'text',
          },

          {
            text: `Payment method \n`,
            width: '*',
            style: 'label',
          },
          {
            columns: [
              {
                image: cardImg,
                width: 30,
                height: 30,
              },
              {
                text: `XXXX XXXX XXXX ${paymentInfo.card_number} \n\n`,
                width: '*',
                style: 'mt4',
              },
            ], columnGap: 16,
          },


        ];

        const headerfooterDoc = {
          header: {
            margin: [0, 20, 0, 0],
            alignment: 'center',

            text: 'Gritwell',
            height: 100,
            color: 'green',

          },
          footer: {
            margin: [72, 0, 72, 0],
            fontSize: 10,
            columns: [{
              with: 'auto',
              alignment: 'center',
              text: '© GRITWELL 2022',
              color: 'green',
            },

            ],
          },
          content: content,
          subheader: {
            bold: true,
            fontSize: 15,
          },
          styles: {
            columns: {
              border: '2px solid grey',
              padding: '5px',
            },
            title: {
              fontSize: 30,
              bold: true,
              margin: [0, 0, 0, 32],
            },
            label: {
              fontSize: 16,
              margin: [0, 0, 0, 4],
            },
            text: {
              fontSize: 14,
              color: '#6F7381',
              margin: [0, 0, 0, 24],
            },
            mt4: {
              margin: [0, 4, 0, 0],
            },
          },
          defaultStyle: {
            border: '2px solid grey',
            padding: '5px',
          },
          pageMargins: [72, 40, 72, 50],
        };

        const pdfDoc = pdfmake.createPdfKitDocument(headerfooterDoc, {});
        pdfDoc.pipe(fs.createWriteStream(fileNamePath));
        pdfDoc.end();

        const fileName = environment.api_base_url + fileNamePath;
        return fileName;
      } else {
        throw new ResourceNotFound('No data found', '');
      }
    } catch (error:any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
}
