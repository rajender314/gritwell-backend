import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = mongoose.Schema;
const customerMaskId = new Schema(
    {
      mask_id: {type: Number},
    },
);
customerMaskId.plugin(mongoosePaginate);
const CustomerMaskIdGenerator =
  mongoose.model('customer_maskid_generator', customerMaskId);
export {CustomerMaskIdGenerator};
