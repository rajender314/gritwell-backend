import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class CreatePaymentInfo
 */
export class CreatePaymentInfo extends BaseCommand {
  public response: object;
  public cardNumber: string;
  public expMonth: number;
  public expYear: number;
  public cardCvv: string;

  public path = __dirname.replace(process.cwd(), '.') + '/CreatePaymentInfo.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.response = data.body;
    this.cardNumber = data.body.cardNumber;
    this.expMonth = data.body.expMonth;
    this.expYear = data.body.expYear;
    this.cardCvv = data.body.cardCvv;
  }
}
