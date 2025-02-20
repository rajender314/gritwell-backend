import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class WebFlowStripeWebhook
 */
export class WebFlowStripeWebhook extends BaseCommand {
  public response: object;

  public path =
    __dirname.replace(process.cwd(), '.') + '/WebFlowStripeWebhook.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.response = data.body;
  }
}
