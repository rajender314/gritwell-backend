import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for SaveEmailDetails
 */
export class SaveEmailDetails extends BaseCommand {
  public to: string;
  public from: string;
  public subject: string;
  public html: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/SaveEmailDetails.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.to = data.to ? data.to : '';
    this.from = data.from ? data.from : '';
    this.html = data.html ? data.html : '';
    this.subject = data.subject ? data.subject : '';
  }
}
