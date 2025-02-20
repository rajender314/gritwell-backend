import mongoose from 'mongoose';
import {Document} from 'mongoose';
const Schema = mongoose.Schema;

interface ILandingPages extends Document {
  _id: string;
  layoutType: string;
  iconSec: [{ label: String; icon: String }];
  heading: string;
  content: string;
  order: number;
  status: boolean;
}

const pwaLandingpages = new Schema<ILandingPages>(
    {
      layoutType: {type: String},
      iconSec: [
        {
          label: {type: String},
          icon: {type: String},
        },
      ],
      heading: {type: String},
      content: {type: String},
      order: {type: Number},
      status: {type: Boolean},
    },
    {
      timestamps: true,
    },
);

const PWALandingPagesSchema = mongoose.model<ILandingPages>(
    'pwa_landingpages',
    pwaLandingpages,
);

export {PWALandingPagesSchema};
