import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class ReSendEmailVerification
 */
export class ReSendEmailVerification extends BaseCommand {
  public email: string;
  public path =
    __dirname.replace(process.cwd(), '.') + '/ReSendEmailVerification.ts';

  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.email = data.body.email ? data.body.email : '';
  }
}
