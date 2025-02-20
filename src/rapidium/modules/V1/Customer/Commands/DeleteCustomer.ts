import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * Command Class for DeleteCustomer
 */
export class DeleteCustomer extends BaseCommand {
  public id: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/DeleteCustomer.ts';
    /**
     *
     * @param {data} data
     */
  constructor(data: any) {
    super(data);

    this.id = data.body.id ? data.body.id : '';
  }
}
