import moment from 'moment-timezone';
/**
 * class BaseHelper
 */
export default class DateFormat {
    /**
     * constructor
     */
    constructor() { }
    /**
      * @param {date} date
     * @return {Object}
     */
    public appointmentDate(date) {
        return moment(date).tz('GMT').format("MMM D, YYYY");
    }

    /**
     * @param {date} startDate, endDate
    * @return {Object}
    */
    public appointmentTime(startDate, endDate) {
        return `${moment(startDate).tz('GMT').format("HH:mm")}-${moment(endDate).tz('GMT').format("HH:mm")}`;
    }
}
