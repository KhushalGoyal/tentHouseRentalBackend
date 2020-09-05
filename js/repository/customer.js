"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepository = void 0;
const customer_1 = require("../models/customer");
class CustomerRepository {
    async save(payload) {
        return (await customer_1.CustomerModel.create(payload)).toObject();
    }
    async update(_id, payload) {
        return (await customer_1.CustomerModel.findByIdAndUpdate({ _id: _id }, payload)).toObject();
    }
    async findById(id) {
        return customer_1.CustomerModel.findById(id).lean();
    }
    async pagination(filter, paginationOptions) {
        return customer_1.CustomerModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery) {
        return customer_1.CustomerModel.find().lean();
    }
}
exports.CustomerRepository = CustomerRepository;
