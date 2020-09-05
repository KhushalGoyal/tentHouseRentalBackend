"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const base_1 = require("../controllers/base");
const customer_1 = require("../repository/customer");
class CustomerService extends base_1.AbstractService {
    constructor() {
        super(...arguments);
        this.customerRepository = new customer_1.CustomerRepository();
        this.create = async (body) => {
            return this.customerRepository.save(body);
        };
        this.get = async (_id) => {
            return this.customerRepository.findById(_id);
        };
        this.getAll = async (query) => {
            const requestQuery = this.getQuery(query);
            return this.customerRepository.getAll(requestQuery);
        };
    }
}
exports.CustomerService = CustomerService;
