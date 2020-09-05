"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configs_1 = require("../configs");
const base_1 = require("../base");
const RefreshTokenController = express_1.Router();
RefreshTokenController.post("/refreshToken", async (request, response, next) => {
    try {
        let user = response.locals.user;
        if (user) {
            console.log(user);
        }
        response.status(configs_1.StatusCodes.UNAUTHORIZED_TOKEN).send(new base_1.ErrorResponse("User not found", configs_1.ErrorCodes.validation_error));
        return;
    }
    catch (err) {
        response.status(configs_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse(err.message, configs_1.ErrorCodes.unprocessed_entry));
    }
});
exports.default = RefreshTokenController;
