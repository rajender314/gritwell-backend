import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * command file class ImportRecommendation
 */
export class ImportRecommendation extends BaseCommand {
  public filename: string;
  public filenamePath: string;
  public fileData: string;
  public type: string;
  public abbr: string;
  public schema: any;
  public excelSchema: any;
  public sheetName: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/ImportRecommendation.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.filename = data.file.filename ? data.file.filename : '';
    this.filenamePath = data.file.path ? data.file.path : '';
    this.fileData = data.file ? data.file : '';
    this.type = data.body.type ? data.body.type : '';
    this.abbr = data.body.abbr;
    this.schema = data.body.schema;
    this.excelSchema = data.body.excelSchema;
    this.sheetName = data.body.sheetName;
  }
}
