import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * command file class ImportExportLog
 */
export class ImportExportLog extends BaseCommand {
  public action: string;
  public collectionName: string;
  public created_by: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/ImportExportLog.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.action = data.action ? data.action : '';
    this.collectionName = data.collectionName ? data.collectionName : '';
    this.created_by = data.created_by ? data.created_by : '';
    this.last_modified_by = data.last_modified_by ? data.last_modified_by : '';
  }
}
