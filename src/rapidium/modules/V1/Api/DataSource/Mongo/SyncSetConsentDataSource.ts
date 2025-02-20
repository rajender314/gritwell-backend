import {FormResponseSchema}
  from '@basePath/Api/DataSource/Models/Schema/FormResponseSchema';
import FormResponse from '@basePath/Api/DataSource/Models/FormResponse';
import {ResourceNotFound} from '@basePath/Exceptions/ResourceNotFound';
const axios = require('axios');

const environment = process.env;
const userProfileFields = {
  'dzKHGc': {
    phone_number: 'A3cRFlpNJ10S',
    legal: 'GwsDiyRGBPzh',
  },
  'vMCOR22d': {
    phone_number: 'DGcsNPLei2Fu',
    legal: 'mO6RK9uBrPBV',
  },
  'T5ucFZsc': {
    phone_number: 'wqEIR3qEuAdD',
    legal: 'TzByUIsoQSuM',
  },
  'frR4XWhz': {
    phone_number: 'rPa0wKi3CjFL',
    legal: 'XEdZTUxDamaX',
  },
  'xPIUmGa1': {
    phone_number: 'HhqWCu13rShT',
    legal: 'XWOyRIIcKK2M',
  },      
};
/**
 * class SyncSetConsentDataSource
 */
export default class SyncSetConsentDataSource {
  /**
     * sync type form responses from webhook post call api from typeforms
     * @param {data}data
     */
  async syncSetConsent(data: any) {
    const response = data.response;
    await new FormResponse(FormResponseSchema).create(
        {response: response},
    );
    const answers = response.form_response.answers;
    const typeFormId = response.form_response.form_id;
    const userFields = (userProfileFields[typeFormId]) ?
    userProfileFields[typeFormId] :
    {};
   //return userFields;
    const consentObject = {
      phone_number: '',
      legal: '',
    };

    // const insertData = new Array();
    await answers.map((item) => {
      const type = item.type;
      Object.entries(userFields).forEach(([key, value]) => {
        if (item.field.id == value) {
          consentObject[key] = item[type];
        }
      });
    });
 
    try {
      return await this.setConsent(consentObject);
    } catch (e: any) {
      console.log(e);
    }
  }

  /**
    * @param {consentObject} consentObject
   * @return {Object}
   */
  async setConsent(consentObject) {
    try {
      const body = {
        'api_key': environment.TEXT_LINE_API_KEY,
        'access_token': environment.TEXT_LINE_SECRET_KEY,
        'phone_number': consentObject.phone_number,
        'consent': consentObject.legal ? 1 : 0,
      };
      const options = {};
      const response = await axios.post(
          environment.TEXT_LINE_ENDPOINT,
          body,
          options,
      );
      return response.data.success;
    } catch (err) {
      throw new ResourceNotFound(err, '');
    }
  }
}
