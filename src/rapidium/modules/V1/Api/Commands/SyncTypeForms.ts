import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class SyncTypeForms
 */
export class SyncTypeForms extends BaseCommand {
  public sync_type: string;
  public path = __dirname.replace(process.cwd(), '.') + '/SyncTypeForms.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.sync_type = data.body.sync_type ? data.body.sync_type : 'forms';
  }
}
