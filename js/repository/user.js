"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReprository = void 0;
const models_1 = require("../models");
class UserReprository {
    async save(payload) {
        return (await models_1.UserModel.create(payload)).toObject();
    }
    async update(_id, payload) {
        return (await models_1.UserModel.findByIdAndUpdate({ _id: _id }, payload)).toObject();
    }
    async findById(id) {
        return models_1.UserModel.findById(id).lean();
    }
    async findByType(type) {
        return models_1.UserModel.findOne({ type: type }).lean();
    }
    async pagination(filter, paginationOptions) {
        return models_1.UserModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery) {
        return models_1.UserModel.find(requestQuery).lean();
    }
}
exports.UserReprository = UserReprository;
