import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class UpdateClient
 */
export class UpdateClient extends BaseCommand {
  public id: string;
  public first_name: string;
  public last_name: string;
  public phone: string;
  public img_file_name: string;
  public img_unique_name: string;
  public address: string;
  public state: string;
  public dob: string;
  public ethnicity: string;
  public height: string;
  public weight: string;
  public location: string;
  //public language: string;
  public path = __dirname.replace(process.cwd(), '.') + '/UpdateClient.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
    this.first_name = data.body.first_name ? data.body.first_name : '';
    this.last_name = data.body.last_name ? data.body.last_name : '';
    this.phone = data.body.phone ? data.body.phone : '';
    this.img_file_name = data.body.img_file_name ? data.body.img_file_name : '';
    this.img_unique_name = data.body.img_unique_name ?
    data.body.img_unique_name :
    '';
    this.address = data.body.address ? data.body.address : '';
    this.state = data.body.state ? data.body.state : '';
    this.dob = data.body.dob ? data.body.dob : '';
    this.ethnicity = data.body.ethnicity ? data.body.ethnicity : '';
    this.height = data.body.height ? data.body.height : '';
    this.weight = data.body.weight ? data.body.weight : '';
    this.location = data.body.location ? data.body.location : '';
    //this.language = data.body.language ? data.body.language : '';
  }
}
