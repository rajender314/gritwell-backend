import { BaseCommand } from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command class for CreateClientNotes
 */
export class CreateClientNotes extends BaseCommand {
    public client_id: string;
    // public note_id: string;
    // public description: string;
    public notes: any;

    public path = __dirname.replace(process.cwd(), '.') + '/CreateClientNotes.ts';
    /**
      * @param {data} data
     */
    constructor(data: any) {
        super(data);
        this.client_id = data.body.client_id ? data.body.client_id : '';
        this.notes = data.body.notes ? data.body.notes : [];
        // this.note_id = data.body.note_id ? data.body.note_id : '';
        // this.description = data.body.description ? data.body.description : '';
    }
}
