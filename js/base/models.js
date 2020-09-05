"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const LogsSchema = new mongoose_1.Schema({
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
const LogsModel = mongoose_1.model('logs', LogsSchema);
exports.default = LogsModel;
