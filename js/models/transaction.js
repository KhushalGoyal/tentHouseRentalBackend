"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const TransactionSchema = new mongoose_1.Schema({
    transaction_date_time: { type: Date, required: true, unique: true },
    customer_id: { type: String, ref: "customer", required: true },
    product_id: { type: String, ref: "products", required: true },
    transaction_type: { type: String, enum: ['OUT', 'IN'], required: true },
    quantity: { type: Number, required: true },
    transaction_id_parent: { type: String }
}, { timestamps: { createdAt: true, updatedAt: true } });
TransactionSchema.plugin(mongoose_paginate_v2_1.default);
exports.TransactionModel = mongoose_1.model('transactions', TransactionSchema);
