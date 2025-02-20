import {BaseCommand} from '@rapCoreBase/Commands/BaseCommand';
/**
 * class DeleteProfilePicture
 */
export class DeleteProfilePicture extends BaseCommand {
  public id: string;

  public path =
    __dirname.replace(process.cwd(), '.') + '/DeleteProfilePicture.ts';
  /**
     * constructor
     * @param {data} data
     */
  constructor(data: any) {
    super(data);

    this.id = data.params.id ? data.params.id : '';
  }
}
