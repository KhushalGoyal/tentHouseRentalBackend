import { Schema, model } from "mongoose";

const LogsSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: new Date(),
    },
    message: {
        type: String,
    },
    stack: {
        type: String,
    },
    statusCode: {
        type: Number,
    },
    type: {
        type: String,
        enum: ["ERROR", "SUCCESS"],
        default: "SUCCESS",
    },
}, { timestamps: { createdAt: true } });

const LogsModel = model('logs', LogsSchema);
export default LogsModel;