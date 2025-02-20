import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class HistoricalTests
 */
export class HistoricalTests extends BaseCommand {
  public id: string;
  public type_form_id: string;
  public type_form_question_id: string;
  public path = __dirname.replace(process.cwd(), '.') + '/HistoricalTests.ts';
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.id = data.params.id ? data.params.id : '';
    this.type_form_id = data.body.type_form_id ? data.body.type_form_id : '';
    this.type_form_question_id = data.body.type_form_question_id ?
    data.body.type_form_question_id :
    '';
  }
}
