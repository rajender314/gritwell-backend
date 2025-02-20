import CustomerReminderEmailsDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerReminderEmailsDataSource';
/**
 * class CustomerReminderEmails
 */
class CustomerReminderEmails {
  /**
   * constructor
   */
  constructor() {}
  /**
   * @param {data} data
   * @return {Object}
   */
  async execute(data: any) {
    return await new CustomerReminderEmailsDataSource().customerReminderEmails(
        data,
    );
  }
}

module.exports = CustomerReminderEmails;
