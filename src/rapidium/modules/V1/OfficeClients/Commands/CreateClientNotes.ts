import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
import {UserProvider} from '@basePath/Web/Interfaces/UserProvider';
/**
 * class CreateClientNotes
 */
export class CreateClientNotes extends BaseCommand {
  public client_id: string;
  public note_id: string;
  public description: string;
  public user_data: UserProvider;

  public path = __dirname.replace(process.cwd(), '.') + '/CreateClientNotes.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.client_id = data.body.client_id ? data.body.client_id : '';
    this.note_id = data.body.note_id ? data.body.note_id : '';
    this.description = data.body.description ? data.body.description : '';
    this.user_data = data.decoded ? data.decoded : '';
  }
}
