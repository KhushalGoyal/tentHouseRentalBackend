import { Schema, model, Types } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";

const CustomerSchema = new Schema({
    name : { type : String, required: true, unique : true },
},{ timestamps: { createdAt: true, updatedAt: true } })

CustomerSchema.plugin(MongoosePaginate);

export const CustomerModel = model('customer', CustomerSchema);
