"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const CustomerSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: { createdAt: true, updatedAt: true } });
CustomerSchema.plugin(mongoose_paginate_v2_1.default);
exports.CustomerModel = mongoose_1.model('customer', CustomerSchema);
