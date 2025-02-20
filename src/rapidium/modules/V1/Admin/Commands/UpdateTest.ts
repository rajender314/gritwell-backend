import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class UpdateTest
 */
export class UpdateTest extends BaseCommand {
  public id: string;
  public name: string;
  public description: string;
  public brand: string;
  public price: number;
  public type: string;
  public link: string;
  public status: boolean;
  public path = __dirname.replace(process.cwd(), '.') + '/UpdateTest.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
    this.name = data.body.name ? data.body.name : '';
    this.description = data.body.description ? data.body.description : '';
    this.brand = data.body.brand ? data.body.brand : '';
    this.price = data.body.price ? data.body.price : '';
    this.type = data.body.type ? data.body.type : '';
    this.link = data.body.link ? data.body.link : '';
    this.status = data.body.status ? data.body.status : false;
  }
}
