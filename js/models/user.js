"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['DEFAULT', 'DYNAMIC'], default: "DEFAULT" }
}, { timestamps: { createdAt: true, updatedAt: true } });
UserSchema.plugin(mongoose_paginate_v2_1.default);
exports.UserModel = mongoose_1.model('users', UserSchema);
