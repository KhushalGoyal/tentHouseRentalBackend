"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configs_1 = require("../configs");
const base_1 = require("../base");
const products_1 = require("../service/products");
const product_1 = require("../validation/product");
const ProductController = express_1.Router();
ProductController.get("/", async (request, response, next) => {
    try {
        let productService = new products_1.ProductService(response.locals.user);
        response.status(configs_1.StatusCodes.OK).send(await productService.getAll(request.query));
        return;
    }
    catch (error) {
        response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse(error.message, configs_1.ErrorCodes.unprocessed_entry));
    }
});
ProductController.post("/", product_1.ProductValidation.create(), async (request, response, next) => {
    try {
        let productService = new products_1.ProductService(response.locals.user);
        let body = request.body;
        body.quantity_booked = body.quantity_booked ? body.quantity_booked : 0;
        let product = await productService.create(body);
        if (product) {
            response.status(configs_1.StatusCodes.OK).send(await productService.getAll(request.query));
        }
        else {
            response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse({}, configs_1.ErrorCodes.unprocessed_entry));
        }
    }
    catch (error) {
        response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse(error.message, configs_1.ErrorCodes.unprocessed_entry));
    }
});
exports.default = ProductController;
