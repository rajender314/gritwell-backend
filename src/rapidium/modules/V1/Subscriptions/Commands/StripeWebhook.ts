import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class StripeWebhook
 */
export class StripeWebhook extends BaseCommand {
  public response: object;

  public path = __dirname.replace(process.cwd(), '.') + '/StripeWebhook.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.response = data.body;
  }
}
