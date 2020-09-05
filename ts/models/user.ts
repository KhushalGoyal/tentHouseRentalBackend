import { Schema, model, Types } from "mongoose";
import MongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new Schema({
    name : { type : String, required: true },
    email : {  type : String, required: true, unique : true },
    password : { type : String, required: true },
    type : { type: String, enum : ['DEFAULT','DYNAMIC'], default: "DEFAULT" }
},{ timestamps: { createdAt: true, updatedAt: true } })

UserSchema.plugin(MongoosePaginate);

export const UserModel = model('users', UserSchema);
