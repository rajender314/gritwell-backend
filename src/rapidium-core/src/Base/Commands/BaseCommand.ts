import BaseHelper from '@rapCoreHelpers/BaseHelper';
import AuthHelper from '@rapCoreHelpers/AuthHelper';
/**
 * class BaseCommand
 */
export class BaseCommand {
  public user_id: any;
  public created_date: any;
  public last_modified_by: string;
  public last_modified_date: any;
  public created_by: any;
  /**
 * @param {data} data
 */
  constructor(data: any = null) {
    const userInfo = new AuthHelper().getUserDetails();
    //console.log(userInfo);
    const Helper = new BaseHelper();

    if ((data && data['oauthVal'] && data['oauthVal'].token)) {
      const decodeValue: any = data['oauthVal'].token;
      this.user_id = decodeValue &&
        decodeValue.user.user_id != undefined ?
        decodeValue.user.user_id :
        '';
    } else {
      if (userInfo && userInfo.user_id) {
        this.user_id = userInfo.user_id;
      }
    }
    if (!(data.params && data.params.id)) {
      this.created_date = Helper.Date();
      this.created_by = this.user_id ? this.user_id.toString() : null;
      this.last_modified_by = this.user_id ? this.user_id.toString() : null;
      this.last_modified_date = Helper.Date();
    } else {
      this.last_modified_by = this.user_id ? this.user_id.toString() : null;
      this.last_modified_date = Helper.Date();
    }
  }
}
