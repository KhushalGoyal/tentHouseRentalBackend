import { body, ValidationChain } from "express-validator";

export class CustomerValidation {
    static create(): ValidationChain[] {
        return [
            body("name").notEmpty().withMessage("name is empty"),
        ];
    }
}
