import {CustomerSchema}
  from '@basePath/Customer/DataSource/Models/Schema/CustomerSchema';

// eslint-disable-next-line
import {ClientAssignmentSchema} from '@basePath/OfficeClients/DataSource/Models/Schema/ClientAssignmentSchema';

/**
   * class CustomerEmailOperations
   */
export default class CustomerEmailOperations {
  /**
   *
   * @return {Object}
   */
  async getReminderToCompleteIntakeAndSymptomData() {
    return await CustomerSchema.aggregate([
      {
        $match: {
          subscription_start_date: {$exists: true},
          $or: [
            {intake_submitted: false},
            {symptom_analysis_submitteds: false},
          ],
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
    ]);
  }
  /**
 *
 * @return {Object}
 */
  async getReminderToBookAnAppointmentData() {
    return await ClientAssignmentSchema.aggregate([
      {
        $match: {
          type: 'health_coach',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'client_id',
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
          from: 'appointments',
          localField: 'client_id',
          foreignField: 'client_id',
          as: 'appointments_data',
        },
      },
      {
        $match: {
          appointments_data: {$eq: []},
        },
      },
    ]);
  }

  /**
   *
   * @param {fromDate}  fromDate
   * @return {Number}
   */
  async dateDifferenceInBusinessDays(fromDate:string) {
    const dDate1 = new Date(fromDate);
    const dDate2 = new Date();

    let iDateDiff; let iAdjust = 0;

    if (dDate2 < dDate1) console.log( -1); // error code if dates transposed
    let iWeekday1 = dDate1.getDay(); // day of week
    let iWeekday2 = dDate2.getDay();
    iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
    iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
    // eslint-disable-next-line
    if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
    iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
    iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;


    const iWeeks =
      Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000) > 0 ?
        Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000) :
        0;

    if (iWeekday1 <= iWeekday2) {
      iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1);
    } else {
      iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2);
    }

    iDateDiff -= iAdjust; // take into account both days on weekend

    console.log( (iDateDiff ));

    return iDateDiff;
  }
}
