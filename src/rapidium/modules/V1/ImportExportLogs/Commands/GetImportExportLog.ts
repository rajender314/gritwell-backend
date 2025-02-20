import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * command file class GetImportExportLog
 */
export class GetImportExportLog extends BaseCommand { 
  public collectionName: string; 

  public path =
    __dirname.replace(process.cwd(), '.') + '/GetImportExportLog.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data); 
    this.collectionName = data.collectionName ? data.collectionName : ''; 
  }
}
