import {SyncAcuityAppointments}
  from '@basePath/Acuity/Commands/SyncAcuityAppointments';
import {AcuityAppointments} from '@basePath/Acuity/Commands/AcuityAppointments';

import {CommandFactory} from '@rapCoreBase/Commands/CommandFactory';

/**
 * lass AcuityDataSource
 */
export default class AcuityDataSource {
  /**
     *
     * @param {data} data
     * @return {Object}
     */
  async syncAcuityAppointments(data: SyncAcuityAppointments) {
    const acuityData = data.resonse;
    if (acuityData.action) {
      const userCommand = new AcuityAppointments({
        id: acuityData.id,
        action: acuityData.action,
      });
      return await new CommandFactory().getCommand(
          userCommand.path,
          true,
          userCommand,
      );
    }
  }
}
