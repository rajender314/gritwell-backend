import AppointmentServeyTypeFormDataSource from '@basePath/Typeforms/DataSource/Mongo/AppointmentServeyTypeFormDataSource';
/**
 * class AppointmentServey
 */
class AppointmentServey {
    /**
     * constructor
     */
    constructor() { }
    /**
   * @param {data} data
   * @return {Object}
   */
    async execute(data: any) {
        return await new AppointmentServeyTypeFormDataSource().sync(data);
    }
}
module.exports = AppointmentServey;
