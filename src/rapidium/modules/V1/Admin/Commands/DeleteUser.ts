import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class DeleteUser
 */
export class DeleteUser extends BaseCommand {
  public id: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/DeleteUser.ts';
    /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);

    this.id = data.body.id ? data.body.id : '';
  }
}
