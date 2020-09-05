import { body, ValidationChain } from "express-validator";

export class ProductValidation {
    static create(): ValidationChain[] {
        return [
            body("product_title").notEmpty().withMessage("title is empty"),
            body("quantity_total").notEmpty().withMessage("total quantity is empty"),
            body("price").notEmpty().withMessage("callBackUrl is empty"),
        ];
    }
}
