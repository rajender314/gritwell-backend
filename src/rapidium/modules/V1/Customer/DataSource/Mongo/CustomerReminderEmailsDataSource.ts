import {CustomerReminderEmails}
  from
  '@basePath/Customer/Commands/CustomerReminderEmails';

import CustomerEmailOperations
  from
  '@basePath/Customer/DataSource/Models/CustomerEmailOperations';

import CustomerMailer
  from '@basePath/Customer/Mailer/CustomerMailer';

/**
 * class CustomerReminderEmailsDataSource
 */
export default class CustomerReminderEmailsDataSource {
  /**
   *
   * @param {data} data
   */
  async customerReminderEmails(data: CustomerReminderEmails) {
    console.log('in data source reminderToCompleteIntakeAndSymptomEmail');
    // Emails for Reminder to complete pre-appointment steps
    // eslint-disable-next-line
    const customersInfo = await new CustomerEmailOperations().getReminderToCompleteIntakeAndSymptomData();
    if (customersInfo && customersInfo.length) {
      customersInfo.forEach(async (customer) => {
        const dateDiff: Number =
          await new CustomerEmailOperations().dateDifferenceInBusinessDays(
              customer.subscription_start_date,
          );
        const customerEmail: string = customer.user_data.email;
        const customerName: string =
          customer.user_data.first_name + ' ' + customer.user_data.last_name;
        //  console.log(
        //    "complete typeforms dateDiff-->",
        //    dateDiff,
        //    customerEmail,
        //    customerName
        //  );
        if (dateDiff === 2 || dateDiff === 7 || dateDiff === 17) {
          new CustomerMailer().reminderToCompleteIntakeAndSymptomEmail({
            email: customerEmail,
            displayName: customerName,
          });
        }
      });
    }

    // Emails for Reminder to book an appointment
    const bookApptCustomersInfo =
      await new CustomerEmailOperations().getReminderToBookAnAppointmentData();
    if (bookApptCustomersInfo && bookApptCustomersInfo.length) {
      bookApptCustomersInfo.forEach(async (customer) => {
        const dateDiff: Number =
          await new CustomerEmailOperations().dateDifferenceInBusinessDays(
              customer.created_date,
          );
        const customerEmail: string = customer.user_data.email;
        const customerName: string =
          customer.user_data.first_name + ' ' + customer.user_data.last_name;
        //  console.log(
        //    "book appointment dateDiff-->",
        //    dateDiff,
        //    customerEmail,
        //    customerName
        //  );
        if (dateDiff === 2 || dateDiff === 7) {
          new CustomerMailer().reminderToBookAnAppointmentEmail({
            email: customerEmail,
            displayName: customerName,
          });
        }
      });
    }
  }
}
