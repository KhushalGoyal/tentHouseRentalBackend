"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const express_validator_1 = require("express-validator");
class ProductValidation {
    static create() {
        return [
            express_validator_1.body("product_title").notEmpty().withMessage("title is empty"),
            express_validator_1.body("quantity_total").notEmpty().withMessage("total quantity is empty"),
            express_validator_1.body("price").notEmpty().withMessage("callBackUrl is empty"),
        ];
    }
}
exports.ProductValidation = ProductValidation;
