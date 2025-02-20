import { SettingsSchema }
  from '@basePath/Settings/DataSource/Models/Schema/SettingsSchema';
import { EmailControllerSchema }
  from '@basePath/Settings/DataSource/Models/Schema/EmailControllerSchema';
import { EmailControllerList }
  from '@basePath/Settings/Commands/EmailControllerList';
import { SaveEmailDetails } from '@basePath/Settings/Commands/SaveEmailDetails';
import { Settings } from '@basePath/Settings/Commands/Settings';
/**
 * DataSource file for SettingsDataSource
 */
export default class SettingsDataSource {
  /**
     * Save Email Details
     * @param {data} data
     * @return {Object}
     */
  async saveEmailDetails(data: SaveEmailDetails) {
    const { to, from, subject, html } = data;
    const emailDetails =
      await EmailControllerSchema.create({ to, from, subject, html });
    return emailDetails;
  }

  /**
     * Get Email Controllers Data
     * @param {data} data
     * @return {Object}
     */
  async emailControllerData(data: EmailControllerList) {
    const skip = (data.page - 1) * data.perPage;
    const limit = data.perPage;
    const result = await EmailControllerSchema.find().skip(skip).limit(limit);
    const count = await EmailControllerSchema.countDocuments();
    return { result, count };
  }

  /**
     * Stop Outgoing Emails
     * @param {data} data
     * @return {Object}
     */
  async stopOutGoingEmails(data: Settings) {
    return true;
    // const {stopOutgoingEmails} = data;
    // const filter = {'object_key': 'stop_outgoing_emails'};
    // const update = {'object_value': stopOutgoingEmails};
    // const settings = await SettingsSchema.findOneAndUpdate(filter, update, {
    //   new: true,
    // });
    // return {settings};
  }
}
