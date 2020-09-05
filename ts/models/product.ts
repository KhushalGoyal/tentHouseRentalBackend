import { Schema, model, Types } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema({
    product_title : { type : String, required: true, unique : true },
    quantity_total : {  type : Number, required: true },
    quantity_booked : { type : Number, required: true },
    price : { type: String, required: true}
},{ timestamps: { createdAt: true, updatedAt: true } })

ProductSchema.plugin(MongoosePaginate);

export const ProductModel = model('products', ProductSchema);
