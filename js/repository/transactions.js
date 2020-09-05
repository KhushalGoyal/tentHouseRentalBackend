"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const transaction_1 = require("../models/transaction");
class TransactionRepository {
    async save(payload) {
        return (await transaction_1.TransactionModel.create(payload)).toObject();
    }
    async update(_id, payload) {
        return (await transaction_1.TransactionModel.findByIdAndUpdate({ _id: _id }, payload)).toObject();
    }
    async findById(id) {
        return transaction_1.TransactionModel.findById(id).lean();
    }
    async pagination(filter, paginationOptions) {
        return transaction_1.TransactionModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery) {
        return transaction_1.TransactionModel.find().lean();
    }
}
exports.TransactionRepository = TransactionRepository;
