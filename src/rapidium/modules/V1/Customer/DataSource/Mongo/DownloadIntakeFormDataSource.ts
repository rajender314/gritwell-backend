
import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';
import {DownloadIntakeForm}
  from '@basePath/Customer/Commands/DownloadIntakeForm';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
import CustomerPaymentHistoryDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerPaymentHistoryDataSource';
import {ObjectId} from '@rapCore/src/Mongodb/Types';
import {ClientDocument} from '@basePath/Documents/Commands/ClientDocument';
import AdminDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';
const fs = require('fs');
const environment = process.env;
const Pdfmake = require('pdfmake');
/**
 * class DownloadIntakeFormDataSource
 */
export default class DownloadIntakeFormDataSource {
  /**
     * @param {data} data
     * @return {Object}
     */
  async downloadIntakeForm(data:DownloadIntakeForm) {
    const userEmail: string = data.userData.email;
    const formatedEmail: string = userEmail.substr(
        0,
        userEmail.lastIndexOf('@'),
    );

    const formResp: any = await new AdminDataSource().getClientFormResponseId({
      type_form_id: environment.TYPE_FORM_INTAKE,
      users_id: ObjectId(data.user_id),
    });
    if (formResp) {
      const typeFormCommand = new ClientDocument({
        params: {
          client_id: data.user_id,
          form_response_id: ObjectId(formResp._id),
          type_form_id: environment.TYPE_FORM_SYMPTOM_ANALYSIS,
        },

      });

      const intakedata = await new CommandFactory().getCommand(
          typeFormCommand.path,
          true,
          typeFormCommand,
      );

      if (intakedata && intakedata.typeform.length > 0) {
        const fileNamePath =
              await new CustomerPaymentHistoryDataSource().getPDFFileNamePath(
                  'intake_form',
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

        intakedata.typeform.forEach(async (rec:any, index)=>{
          content.push(
              {
                'columns': [

                  {
                    text: `${index+1}. ${rec.question} \n\n ${rec.answer} \n\n`,
                    width: '*',
                  },

                ],
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
        throw new ResourceNotFound('Response not found', '');
      }


      // const body = {
      //   type_form_id: environment.TYPE_FORM_INTAKE,
      //   form_type: 'intake',
      // };
      // const typeFormCommand = new TypeForm({
      //   params: {
      //     id: data.user_id,
      //   },
      //   body,
      // });
    } else {
      throw new ResourceNotFound('no data found', '');
    }
  }
}
