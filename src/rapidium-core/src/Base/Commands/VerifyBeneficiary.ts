import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class VerifyBeneficiary
 */
export class VerifyBeneficiary extends BaseCommand {
  public custBId: string;
  public custId: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/VerifyBeneficiary.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super();

    this.custBId = data.body.custBId ? data.body.custBId : '';
    this.custId = data.body.custId ? data.body.custId : '';
  }
}
