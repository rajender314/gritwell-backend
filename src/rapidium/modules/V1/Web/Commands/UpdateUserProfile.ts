import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * Command file for UpdateUserProfile
 */
export class UpdateUserProfile extends BaseCommand {
  public userData: UserProvider;
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
  public experience: Object;
  public time_zone: Object;
  public allocation: Number;
  public specialists: Object[];
  public day_of_the_week: Object[];
  public status: Boolean;
  public location: string;
  public language: string;
  public path = __dirname.replace(process.cwd(), '.') + '/UpdateUserProfile.ts';
  /**
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.userData = data.decoded ? data.decoded : {};
    this.first_name = data.body.first_name ? data.body.first_name : '';
    this.last_name = data.body.last_name ? data.body.last_name : '';
    this.phone = data.body.phone ? data.body.phone : '';
    this.img_file_name = data.body.img_file_name ? data.body.img_file_name : '';
    this.img_unique_name =
      data.body.img_unique_name ? data.body.img_unique_name : '';
    this.role_id = data.body.role_id ? data.body.role_id : '';
    this.is_admin = data.body.is_admin ? data.body.is_admin : false;
    this.zoom_link = data.body.zoom_link ? data.body.zoom_link : '';
    this.qualifications =
      data.body.qualifications ? data.body.qualifications : '';
    this.background = data.body.background ? data.body.background : '';
    this.experience = data.body.experience ? data.body.experience : '';
    this.time_zone = data.body.time_zone ? data.body.time_zone : '';
    this.allocation = data.body.allocation ? data.body.allocation : '';
    this.specialists = data.body.specialists ? data.body.specialists : [];
    this.day_of_the_week =
      data.body.day_of_the_week ? data.body.day_of_the_week : [];
    this.status = true;
    this.location = data.body.location ? data.body.location : '';
    this.language = data.body.language ? data.body.language : '';
  }
}
