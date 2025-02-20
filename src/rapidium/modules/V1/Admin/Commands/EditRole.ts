import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class EditRole
 */
export class EditRole extends BaseCommand {
  public id: string;
  public name: string;
  public assign_client_to: Object;
  public permission: Object;
  public custome_fields: Object;
  public status: boolean;

  public path = __dirname.replace(process.cwd(), '.') + '/EditRole.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
    this.name = data.body.name ? data.body.name : '';
    this.permission = data.body.permission ? data.body.permission : {};
    this.status = data.body.status ? data.body.status : true;
    this.assign_client_to = data.body.assign_client_to ?
    data.body.assign_client_to :
     {};
    this.custome_fields = data.body.custome_fields ?
     data.body.custome_fields :
     {};
  }
}
