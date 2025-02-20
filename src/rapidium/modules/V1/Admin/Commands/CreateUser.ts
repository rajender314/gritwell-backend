import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';

/**
 * class CreateUser
 */
export class CreateUser extends BaseCommand {
  public first_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public is_password_updated: boolean;
  public user_type: number;
  public phone: string;
  public img_file_name: string;
  public img_unique_name: string;
  public role_id: string;
  public is_admin: boolean;
  public acuity_calendar_id: string;
  public zoom_link: string;
  public qualifications: string;
  public background: string;
  public experience: string;
  public time_zone: string;
  public allocation: Number;
  public available: Number;
  public specialists: Object[];
  public day_of_the_week: Object[];
  public status: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/CreateUser.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.first_name = data.body.first_name ? data.body.first_name.trim() : '';
    this.last_name = data.body.last_name ? data.body.last_name.trim() : '';
    this.email = data.body.email ? data.body.email.trim() : '';
    this.password = data.body.password ? data.body.password : '';
    this.is_password_updated = false;
    this.user_type = 1;
    this.phone = data.body.phone ? data.body.phone : '';
    this.img_file_name = data.body.img_file_name ? data.body.img_file_name : '';
    this.img_unique_name = data.body.img_unique_name ?
    data.body.img_unique_name :
    '';
    this.role_id = data.body.role_id ? data.body.role_id : '';
    this.is_admin = false;
    this.acuity_calendar_id = data.body.acuity_calendar_id ? data.body.acuity_calendar_id.trim() : '';
    this.zoom_link = data.body.zoom_link ? data.body.zoom_link.trim() : '';
    this.qualifications = data.body.qualifications ?
    data.body.qualifications :
    '';
    this.background = data.body.background ? data.body.background.trim() : '';
    this.experience = data.body.experience ? data.body.experience : '';
    this.time_zone = data.body.time_zone ? data.body.time_zone : '';
    this.allocation = data.body.allocation ? data.body.allocation : '';
    this.available = data.body.available ? data.body.available : 0;
    this.specialists = data.body.specialists ? data.body.specialists : [];
    this.day_of_the_week = data.body.day_of_the_week ?
    data.body.day_of_the_week :
    [];
    this.status = data.body.status ? data.body.status : false;
  }
}
