"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const ProductSchema = new mongoose_1.Schema({
    product_title: { type: String, required: true },
    quantity_total: { type: Number, required: true, unique: true },
    quantity_booked: { type: Number, required: true },
    price: { type: String, required: true }
}, { timestamps: { createdAt: true, updatedAt: true } });
ProductSchema.plugin(mongoose_paginate_v2_1.default);
exports.ProductModel = mongoose_1.model('products', ProductSchema);
