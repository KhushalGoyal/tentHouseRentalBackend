"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configs_1 = require("../configs");
const base_1 = require("../base");
const transactions_1 = require("../service/transactions");
const transactions_2 = require("../validation/transactions");
const TransactionController = express_1.Router();
TransactionController.get("/", async (request, response, next) => {
    try {
        let transactionService = new transactions_1.TransactionService(response.locals.user);
        response.status(configs_1.StatusCodes.OK).send(await transactionService.getAll(request.query));
        return;
    }
    catch (error) {
        response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse(error.message, configs_1.ErrorCodes.unprocessed_entry));
    }
});
TransactionController.post("/", transactions_2.TransactionValidation.create(), async (request, response, next) => {
    try {
        let transactionService = new transactions_1.TransactionService(response.locals.user);
        let body = request.body;
        if (body.transaction_type == 'OUT') {
            let checkIf = await transactionService.checkForIfCanMakeOutTransaction(body.product_id, body.quantity);
            if (checkIf) {
                let product = await transactionService.create(body);
                await transactionService.appendBookedProduct(body.product_id, body.quantity);
                if (product) {
                    response.status(configs_1.StatusCodes.OK).send(await transactionService.getAll(request.query));
                }
                else {
                    response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse({}, configs_1.ErrorCodes.unprocessed_entry));
                }
                return;
            }
            else {
                response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse("Invalid Transaction", configs_1.ErrorCodes.unprocessed_entry));
            }
        }
        else {
            let checkIf = await transactionService.checkForIfCanMakeInTransaction(body.product_id, body.quantity);
            if (checkIf) {
                let product = await transactionService.create(body);
                await transactionService.substractBookedProduct(body.product_id, body.quantity);
                if (product) {
                    response.status(configs_1.StatusCodes.OK).send(await transactionService.getAll(request.query));
                }
                else {
                    response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse({}, configs_1.ErrorCodes.unprocessed_entry));
                }
            }
            else {
                response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse("Invalid Transaction", configs_1.ErrorCodes.unprocessed_entry));
            }
            return;
        }
        return;
    }
    catch (error) {
        response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse(error.message, configs_1.ErrorCodes.unprocessed_entry));
    }
});
exports.default = TransactionController;
