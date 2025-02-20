// import { CustomerRecentActivitySchema }
//     from '@basePath/Customer/DataSource/Models/Schema/CustomerRecentActivitySchema';
const CustomerRecentActivitySchema = require('./../Customer/DataSource/Models/Schema/CustomerRecentActivitySchema.ts');

// console.log('@basePath/Customer/DataSource/Models/Schema/NutritionSchema');
// const NutritionSchema = require('@basePath/Customer/DataSource/Models/Schema/NutritionSchema')
const mongoose = require('mongoose');
const { Schema } = mongoose;

let self = this;
const historySchema = new Schema(
    {
        collectionName: String,
        collectionId: Schema.Types.ObjectId,
        diff: {},
        user: {},
        reason: String,
        type: String,
        version: { type: Number, min: 0 }
    },
    {
        timestamps: true
    }
);

// historySchema.pre('save', function (doc, next) {
//     console.log(20, this) 
// });

historySchema.pre('save', function (next) {
    CustomerRecentActivitySchema.model.create({
        "collection_id": this.collectionId,
        "created_by": "Sravan",
        "action": "Nutrition Added"
    })
    next();
});

// historySchema.pre('save', async function (doc, next) {
//     console.log(25, doc)
//     // if (this.collectionName)
//     //     next()
// }); 

module.exports = { model: mongoose.model('History', historySchema) };
