"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionValidation = void 0;
const express_validator_1 = require("express-validator");
class TransactionValidation {
    static create() {
        return [
            express_validator_1.body("transaction_date_time").notEmpty().withMessage("Transaction date is empty"),
            express_validator_1.body("customer_id").notEmpty().withMessage("Customer id is empty"),
            express_validator_1.body("product_id").notEmpty().withMessage("Product Id is empty"),
            express_validator_1.body("transaction_type").notEmpty().withMessage("Transaction type is is empty"),
            express_validator_1.body("quantity").notEmpty().withMessage("quantity is empty"),
        ];
    }
}
exports.TransactionValidation = TransactionValidation;
