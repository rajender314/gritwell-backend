import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class CreateSupplement
 */
export class CreateSupplement extends BaseCommand {
  public name: string;
  public description: string;
  public brand: string;
  public dosage: string;
  public price: number;
  public link: string;
  public status: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/CreateSupplement.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.name = data.body.name ? data.body.name : '';
    this.description = data.body.description ? data.body.description : '';
    this.brand = data.body.brand ? data.body.brand : '';
    this.dosage = data.body.dosage ? data.body.dosage : '';
    this.price = data.body.price ? data.body.price : '';
    this.link = data.body.link ? data.body.link : '';
    this.status = true;
  }
}
