"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReprository = void 0;
const product_1 = require("../models/product");
class ProductReprository {
    async save(payload) {
        return (await product_1.ProductModel.create(payload)).toObject();
    }
    async update(_id, payload) {
        return (await product_1.ProductModel.findByIdAndUpdate({ _id: _id }, payload)).toObject();
    }
    async findById(id) {
        return product_1.ProductModel.findById(id).lean();
    }
    async pagination(filter, paginationOptions) {
        return product_1.ProductModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery) {
        return product_1.ProductModel.find().lean();
    }
}
exports.ProductReprository = ProductReprository;
