"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configs_1 = require("../configs");
const base_1 = require("../base");
const customer_1 = require("../service/customer");
const customer_2 = require("../validation/customer");
const CustomerController = express_1.Router();
CustomerController.get("/", async (request, response, next) => {
    try {
        let customerService = new customer_1.CustomerService(response.locals.user);
        response.status(configs_1.StatusCodes.OK).send(await customerService.getAll(request.query));
        return;
    }
    catch (error) {
        response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse(error.message, configs_1.ErrorCodes.unprocessed_entry));
    }
});
CustomerController.post("/", customer_2.CustomerValidation.create(), async (request, response, next) => {
    try {
        let customerService = new customer_1.CustomerService(response.locals.user);
        let body = request.body;
        let product = await customerService.create(body);
        if (product) {
            response.status(configs_1.StatusCodes.OK).send(await customerService.getAll(request.query));
        }
        else {
            response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse({}, configs_1.ErrorCodes.unprocessed_entry));
        }
    }
    catch (error) {
        response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse(error.message, configs_1.ErrorCodes.unprocessed_entry));
    }
});
exports.default = CustomerController;
