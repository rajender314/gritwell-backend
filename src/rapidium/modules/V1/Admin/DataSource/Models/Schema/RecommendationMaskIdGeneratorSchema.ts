import mongoose from 'mongoose';
import {Document} from 'mongoose';

interface IRecommendationMaskIdGenerator extends Document {
    id: string;
    type: string;
    mask_id: number;
}

const Schema = mongoose.Schema;

const recommendationMaskId = new Schema<IRecommendationMaskIdGenerator>(
    {
      id: {type: String},
      type: {type: String},
      mask_id: {type: Number},
    },
    {timestamps: true},
);
const RecommendationMaskIdGeneratorSchema =
  mongoose.model<IRecommendationMaskIdGenerator>(
      'recommendations_maskid_generators',
      recommendationMaskId,
  );
export {RecommendationMaskIdGeneratorSchema};
