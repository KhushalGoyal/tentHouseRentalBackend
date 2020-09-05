"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const base_1 = require("./base");
const product_1 = require("../repository/product");
class ProductService extends base_1.AbstractService {
    constructor() {
        super(...arguments);
        this.productRepository = new product_1.ProductReprository();
        this.create = async (body) => {
            return this.productRepository.save(body);
        };
        this.get = async (_id) => {
            return this.productRepository.findById(_id);
        };
        this.getAll = async (query) => {
            const requestQuery = this.getQuery(query);
            return this.productRepository.getAll(requestQuery);
        };
    }
}
exports.ProductService = ProductService;
