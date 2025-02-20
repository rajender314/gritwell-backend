import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class ClientNotes
 */
export class ClientNotes extends BaseCommand {
  public client_id: string;
  // public notes_id: string;
  // public description: string;
  public path = __dirname.replace(process.cwd(), '.') + '/ClientNotes.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.client_id = data.params.id ? data.params.id : '';
    // this.notes_id = data.body.notes_id ? data.body.notes_id : "";
    // this.description = data.body.description ? data.body.description : "";
  }
}
