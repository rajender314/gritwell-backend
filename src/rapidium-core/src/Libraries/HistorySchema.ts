import mongoose from 'mongoose';
import { CustomerRecentActivitySchema }
    from '@basePath/Customer/DataSource/Models/Schema/CustomerRecentActivitySchema';
import { Document, Types } from 'mongoose';
import HistoryPayload from '@basePath/History/HistoryPayload';

const collections = ['customer', 'customer_assignments'];

interface IHistory extends Document {
    collectionId: string;
    collectionName: string;
    diff: any;
    user: any;
    reason: string;
    type: string;
    version: number;
    clientId: string;
}

const Schema = mongoose.Schema;
const historySchema = new Schema<IHistory>(
    {
        collectionName: String,
        collectionId: Schema.Types.ObjectId,
        diff: {},
        user: {},
        reason: String,
        type: String,
        clientId: String,
        version: { type: Number, min: 0 }
    },
    {
        timestamps: true
    }
);


historySchema.pre('save', async function (next) {
    if (collections.includes(this.collectionName)) {
        const payload = await new HistoryPayload().get(this);
        //console.log(payload);
        if(payload && payload.action) {
            CustomerRecentActivitySchema.create(payload);
        }
        
    }
    next();
});




const History =
    mongoose.model<IHistory>('History', historySchema);
export { History };

