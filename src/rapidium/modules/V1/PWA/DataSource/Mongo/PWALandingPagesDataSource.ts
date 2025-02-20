import {PWALandingPagesSchema}
  from '@basePath/PWA/DataSource/Models/Schema/PWALandingPagesSchema';
import {SubscriptionPlansSchema}
  from '@basePath/PWA/DataSource/Models/Schema/SubscriptionPlans';
import {DocumentsSchema}
  from '@basePath/PWA/DataSource/Models/Schema/DocumentsSchema';
import {
  ResourceNotFound,
  ResourceRecordNotFound,
} from '@basePath/Exceptions/ResourceNotFound';
const environment = process.env;
/**
 * DataSource class PWALandingPagesDataSource
 */
export default class PWALandingPagesDataSource {
  /**
    * @param {data} data
   * @return {Object} PWA landing ages information
   */
  async pwaLandingPages(data: any) {
    try {
      return await PWALandingPagesSchema.find({
        status: true,
      }).sort({order: 1});
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
    * @param {data} data
   * @return {Object} PWA health plans information
   */
  async subscriptionPlans(data:any) {
    try {
      const slug = ['advance', 'comprehensive'];
      if (!slug.includes(data.slug)) {
        throw new ResourceRecordNotFound('Invalid Slug', '');
      }
      return await SubscriptionPlansSchema.find({
        plan_slug: data.slug,
        status: true,
      });
    } catch (err: any) {
      throw new ResourceNotFound(err.message, '');
    }
  }
  /**
    * @param {data} data
   * @return {Object} PWA FAQs
   */
  async pwaSignInDocs(data:any) {
    try {
      return await DocumentsSchema.find({
        status: true,
      }).then(async (docs:any)=>{
        const document = {};
        if (docs) {
          docs.forEach( (documents)=>{
            const docName: string = documents.doc_name;
            const docFileName: string =
            environment.api_base_url+'uploads/faqs/' + documents.doc_file_name;
            document[docName] = docFileName;
          });
        }
        return document;
      }).catch(async (error:any)=>{
        throw new ResourceNotFound(error.message, '');
      });
    } catch (error: any) {
      throw new ResourceNotFound(error.message, '');
    }
  }
}
