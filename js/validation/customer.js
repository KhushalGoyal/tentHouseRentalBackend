"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidation = void 0;
const express_validator_1 = require("express-validator");
class CustomerValidation {
    static create() {
        return [
            express_validator_1.body("name").notEmpty().withMessage("name is empty"),
        ];
    }
}
exports.CustomerValidation = CustomerValidation;
