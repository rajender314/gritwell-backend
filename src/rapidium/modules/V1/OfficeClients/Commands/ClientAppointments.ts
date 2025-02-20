import { BaseCommand } from "@rapCoreBase/Commands/BaseCommand";
/**
 * class ClientAppointments
 */
export class ClientAppointments extends BaseCommand {
  public client_id: string;
  public onlyFirstAppointment: string;
  public type: string;
  public offSet: string;
  public path =
    __dirname.replace(process.cwd(), ".") + "/ClientAppointments.ts";
  /**
   * constructor
   * @param {data} data
   */
  constructor(data: any) {
    super(data);
    this.client_id = data.params.id ? data.params.id : "";
    this.onlyFirstAppointment = data.params.onlyFirstAppointment ?
       data.params.onlyFirstAppointment :
       'two';
    this.offSet = data.params.offSet ? data.params.offSet : '+330'; 
    this.type = data.params.type ? data.params.type : 'upcoming'
  }
}
