import {sequelize} from '../../../../../../../Db';
import * as Sequelize from 'sequelize';
import {time} from 'aws-sdk/clients/frauddetector';

export interface TimeSlotsInstances extends Sequelize.Model {
  id: number;
  schedule_time_slot: string;
  schedule_time_format: string;
  start_at: time;
  end_at: time;
}

export const TimeSlotsSchema = sequelize.define<TimeSlotsInstances>(
    'organization_locations',
    {
      id: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        primaryKey: true,
      },
      schedule_time_slot: {
        type: Sequelize.STRING,
      },
      schedule_time_format: {
        type: Sequelize.STRING,
      },
      start_at: {
        type: Sequelize.TIME,
      },
      end_at: {
        type: Sequelize.TIME,
      },
    },
    {
      timestamps: false,
    },
);
