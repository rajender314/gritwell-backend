import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';

/**
 * class DownloadPaymentDetails
 */
export class DownloadPaymentDetails extends BaseCommand {
  public id: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/DownloadPaymentDetails.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.id = data.params.id ? data.params.id : '';
  }
}
