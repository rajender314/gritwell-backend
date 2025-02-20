import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * class SyncTypeFormResonse
 */
export class SyncTypeFormResonse extends BaseCommand {
  public response: object;
  public userProfileFields: object;
  public userData: object;
  public type_form_id: string;
  public appointment_id: string;
  public path =
    __dirname.replace(process.cwd(), '.') + '/SyncTypeFormResonse.ts';
  /**
     * @param {data} data
    */
  constructor(data: any) {
    super(data);
    this.response = data.body.response ? data.body.response : data.body;
    this.userProfileFields = data.userProfileFields;
    this.userData = data.userData;
    this.type_form_id = data.type_form_id;
    this.appointment_id = data.appointment_id ? data.appointment_id : '';
  }
}
