import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for verifyBeneficiary
 */
export class VerifyBeneficiary extends BaseCommand {
  public data: any;

  public path = __dirname.replace(process.cwd(), '.') + '/VerifyBeneficiary.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.data = data;
  }
}
