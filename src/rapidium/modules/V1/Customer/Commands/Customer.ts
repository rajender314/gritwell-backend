import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command Class for Customer
 */
export class Customer extends BaseCommand {
  public id: string;
  public user_id: string;
  public first_name: string;
  public last_name: string;
  public phone: string;
  public img_file_name:string;
  public img_unique_name:string;
  public role_id: string;
  public is_admin:boolean;


  public path = __dirname.replace(process.cwd(), '.') + '/Customer.ts';
  /**
   *
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.id = data.body.id ? data.body.id : '';
    this.user_id = data.body.user_id ? data.body.user_id : '';
    this.first_name = data.body.first_name ? data.body.first_name : '';
    this.last_name = data.body.last_name ? data.body.last_name : '';
    this.phone = data.body.phone ? data.body.phone : '';
    this.img_file_name = data.body.img_file_name ? data.body.img_file_name : '';
    this.img_unique_name = data.body.img_unique_name ?
    data.body.img_unique_name :
    '';
    this.role_id = data.body.role_id ? data.body.role_id : '';
    this.is_admin = data.body.is_admin ? data.body.is_admin : false;
  }
}
