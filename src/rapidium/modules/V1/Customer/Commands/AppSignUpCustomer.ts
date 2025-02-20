import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command file for AppSignUpCustomer
 */
export class AppSignUpCustomer extends BaseCommand {
  public first_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public is_password_updated: boolean;
  public user_type: Number;
  public phone: string;
  public img_file_name: string;
  public img_unique_name: string;
  public role_id: string;
  public is_admin: boolean;
  public user_id: string;
  public status: boolean;
  public address: string;
  public state: string;
  public dob: string;
  public ethnicity: string;
  public gender: string;
  public height: string;
  public weight: string;
  public req_type: string;
  public symptom_analysis_submitted: boolean;
  public intake_submitted: boolean;
  // public is_auto_login: boolean;
  // public temp_password: string;

  public path = __dirname.replace(process.cwd(), '.') + '/AppSignUpCustomer.ts';
  /**
   *
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.first_name = data.body.first_name ? data.body.first_name.trim() : '';
    this.last_name = data.body.last_name ? data.body.last_name.trim() : '';
    this.email = data.body.email ? data.body.email : '';
    this.password = data.body.password ? data.body.password : '';
    this.is_password_updated = false;
    this.user_type = 2;
    this.phone = data.body.phone ? data.body.phone : '';
    this.img_file_name = data.body.img_file_name ? data.body.img_file_name : '';
    this.img_unique_name = data.body.img_unique_name ?
      data.body.img_unique_name :
      '';
    this.role_id = '6221ba8d9ba53455ee9eb9b0';
    this.user_id = data.body.user_id ? data.body.user_id : '';
    this.is_admin = false;
    this.status = data.body.status ? data.body.status : false;
    this.address = data.body.address ? data.body.address : '';
    this.state = data.body.state ? data.body.state : '';
    this.dob = data.body.dob ? data.body.dob : '';
    this.ethnicity = data.body.ethnicity ? data.body.ethnicity : '';
    this.gender = data.body.gender ? data.body.gender : '';
    this.height = data.body.height ? data.body.height : '';
    this.weight = data.body.weight ? data.body.weight : '';
    this.req_type = data.body.req_type ? data.body.req_type : '';
    this.symptom_analysis_submitted = data.body.symptom_analysis_submitted ?
      data.body.symptom_analysis_submitted :
      false;
    this.intake_submitted = data.body.intake_submitted ?
      data.body.intake_submitted :
      false;

    // this.is_auto_login =
    // data.body.is_auto_login ? data.body.is_auto_login : false;
    // this.temp_password = ''
  }
}
