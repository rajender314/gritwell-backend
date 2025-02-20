import cron from 'node-cron';
import { UpdateAppointmentStatus }
  from '@basePath/Appointments/Commands/UpdateAppointmentStatus';
import {CustomerReminderEmails} from '@basePath/Customer/Commands/CustomerReminderEmails'
import { CommandFactory } from '@rapCoreBase/Commands/CommandFactory';

exports.initScheduledJobs = () => {
  const scheduledJobFunction = cron.schedule("*/5 * * * *", async function () {
    // const scheduledJobFunction = cron.schedule("*/1 * * * * *", async function () {
    // const updateAppointmentStatusCommand = new UpdateAppointmentStatus({});
    // return await new CommandFactory().getCommand(
    //   updateAppointmentStatusCommand.path,
    //   true,
    //   updateAppointmentStatusCommand,
    // );
  });
  // */1 * * * * --> every mintue
  //for every day
  const emailScheduledJobFunction = cron.schedule("0 0 0 * * *", async function () { 
    const customerReminderEmailscommand = new CustomerReminderEmails({})
     return await new CommandFactory().getCommand(
      customerReminderEmailscommand.path,
      true,
      customerReminderEmailscommand,
    );

  })

  scheduledJobFunction.start();
  emailScheduledJobFunction.start();
}