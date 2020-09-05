"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayload = void 0;
const express_validator_1 = require("express-validator");
const base_1 = require("../base");
const app_1 = require("../configs/app");
function validatePayload(request, response, next) {
    const error = express_validator_1.validationResult(request);
    if (!error.isEmpty()) {
        const mappedError = error.array().map((el) => ({ key: el.param, message: el.msg, value: el.value }));
        response.status(app_1.StatusCodes.BAD_REQUEST).send(new base_1.ErrorResponse(mappedError));
        return;
    }
    else {
        next();
    }
}
exports.validatePayload = validatePayload;
