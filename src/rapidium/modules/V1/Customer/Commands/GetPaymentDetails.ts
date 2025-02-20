import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';

/**
 * class GetPaymentDetails
 */
export class GetPaymentDetails extends BaseCommand {
  public id: string;

  public path = __dirname.replace(process.cwd(), '.') + '/GetPaymentDetails.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.id = data.params.id ? data.params.id : '';
  }
}
