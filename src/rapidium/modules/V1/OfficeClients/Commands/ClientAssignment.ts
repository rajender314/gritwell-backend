import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class ClientAssignment
 */
export class ClientAssignment extends BaseCommand {
  public client_id: string;
  public assignment_user_id: string;
  public type: string;
  public assigned_by: string;
  public assigned_date: Date;
  public user_data: UserProvider;

  public path = __dirname.replace(process.cwd(), '.') + '/ClientAssignment.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.client_id = data.body.client_id ? data.body.client_id : '';
    this.assignment_user_id = data.body.assignment_user_id ?
    data.body.assignment_user_id :
     '';
    this.assigned_by = '';
    this.assigned_date = new Date(); ;
    this.user_data = data.decoded ? data.decoded : {};
    this.type = '';
  }
}
