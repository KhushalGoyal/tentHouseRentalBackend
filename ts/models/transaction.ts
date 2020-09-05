import { Schema, model, Types } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";

const TransactionSchema = new Schema({
    transaction_date_time : { type : Date, required: true, unique : true },
    customer_id : {  type : String, ref: "customer", required: true },
    product_id : { type : String, ref: "products", required: true },
    transaction_type : { type: String, enum:['OUT', 'IN'] , required: true},
    quantity : { type: Number, required: true},
    transaction_id_parent : { type: String}
},{ timestamps: { createdAt: true, updatedAt: true } })

TransactionSchema.plugin(MongoosePaginate);

export const TransactionModel = model('transactions', TransactionSchema);
