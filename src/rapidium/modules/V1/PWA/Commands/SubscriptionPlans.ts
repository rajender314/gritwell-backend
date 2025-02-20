import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for SubscriptionPlans
 */
export class SubscriptionPlans extends BaseCommand {
  public slug: string;
  public response: object;

  public path = __dirname.replace(process.cwd(), '.') + '/SubscriptionPlans.ts';
  /**
     * @param {data} data
     */
  constructor(data: any) {
    super(data);
    this.slug = data.params.slug ? data.params.slug : '';
    this.response = data.body;
  }
}
