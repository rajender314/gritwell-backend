import CustomerDataSource
  from '@basePath/Customer/DataSource/Mongo/CustomerDataSource';

/**
 *  class SymptomAnalysis
 */
class SymptomAnalysis {
/**
   * constructor
   */
  constructor() { }
  /**
* @param {data} data
* @return {Object}
*/
  async execute(data: any) {
    return await new CustomerDataSource().symptomAnalysis(data);
  }
}

module.exports = SymptomAnalysis;
