import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class UpdateUser
 */
export class UpdateUser extends BaseCommand {
  public id: string;
  public first_name: string;
  public last_name: string;
  public phone: string;
  public img_file_name: string;
  public img_unique_name: string;
  public role_id: string;
  public is_admin: boolean;
  public zoom_link: string;
  public qualifications: string;
  public background: string;
  public experience: string;
  public time_zone: string;
  public allocation: Number;
  public specialists: Object[];
  public day_of_the_week: Object[];
  public status: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/UpdateUser.ts';
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
    this.role_id = data.body.role_id ? data.body.role_id : '';
    this.is_admin = data.body.is_admin ? data.body.is_admin : false;
    this.zoom_link = data.body.zoom_link ? data.body.zoom_link : '';
    this.qualifications = data.body.qualifications ?
    data.body.qualifications :
     '';
    this.background = data.body.background ? data.body.background : '';
    this.experience = data.body.experience ? data.body.experience : '';
    this.time_zone = data.body.time_zone ? data.body.time_zone : '';
    this.allocation = data.body.allocation ? data.body.allocation : '';
    this.specialists = data.body.specialists ? data.body.specialists : [];
    this.day_of_the_week = data.body.day_of_the_week ?
    data.body.day_of_the_week :
    [];
    this.status = data.body.status ? data.body.status : false;
  }
}
