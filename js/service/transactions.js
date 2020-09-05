"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const base_1 = require("../controllers/base");
const transactions_1 = require("../repository/transactions");
const product_1 = require("../repository/product");
class TransactionService extends base_1.AbstractService {
    constructor() {
        super(...arguments);
        this.transactionRepository = new transactions_1.TransactionRepository();
        this.productRepository = new product_1.ProductReprository();
        this.create = async (body) => {
            return this.transactionRepository.save(body);
        };
        this.get = async (_id) => {
            return this.transactionRepository.findById(_id);
        };
        this.getAll = async (query) => {
            const requestQuery = this.getQuery(query);
            return this.transactionRepository.getAll(requestQuery);
        };
        this.appendBookedProduct = async (_id, quantity) => {
            let product = await this.productRepository.findById(_id);
            product.quantity_booked = product.quantity_booked + parseInt(quantity);
            return this.productRepository.update(_id, product);
        };
        this.substractBookedProduct = async (_id, quantity) => {
            let product = await this.productRepository.findById(_id);
            product.quantity_booked = product.quantity_booked - parseInt(quantity);
            return this.productRepository.update(_id, product);
        };
        this.checkForIfCanMakeOutTransaction = async (_id, quantity) => {
            let product = await this.productRepository.findById(_id);
            return (product.quantity_total - product.quantity_booked) >= parseInt(quantity) ? true : false;
        };
        this.checkForIfCanMakeInTransaction = async (_id, quantity) => {
            let product = await this.productRepository.findById(_id);
            console.log(product.quantity_total, product.quantity_booked, quantity);
            return product.quantity_total >= parseInt(quantity) ? true : false;
        };
    }
}
exports.TransactionService = TransactionService;
