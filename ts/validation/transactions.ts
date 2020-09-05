import { body, ValidationChain } from "express-validator";

export class TransactionValidation {
    static create(): ValidationChain[] {
        return [
            body("transaction_date_time").notEmpty().withMessage("Transaction date is empty"),
            body("customer_id").notEmpty().withMessage("Customer id is empty"),
            body("product_id").notEmpty().withMessage("Product Id is empty"),
            body("transaction_type").notEmpty().withMessage("Transaction type is is empty"),
            body("quantity").notEmpty().withMessage("quantity is empty"),
        ];
    }
}
