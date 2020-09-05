"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_1 = require("../helpers/password");
const models_1 = require("../models");
const base_1 = require("../base");
const app_1 = require("../configs/app");
const token_1 = require("../helpers/token");
const LoginController = express_1.Router();
LoginController.post("/", async (request, response, next) => {
    try {
        let body = request.body;
        if (!body.username || !body.password) {
            response.status(app_1.StatusCodes.UNAUTHORIZED_ACCESS).send(new base_1.ErrorResponse("Invalid Request, Password/Username is missing", app_1.ErrorCodes.validation_error));
        }
        let user = await models_1.UserModel.findOne({ email: body.username }).lean();
        console.log(user);
        let isValid = password_1.PasswordHelper.compare(body.password, user.password);
        let token = token_1.TokensHelper.generateToken(user, { expiresIn: '1h' });
        if (isValid) {
            response.status(app_1.StatusCodes.OK).send(new base_1.SuccessResponse({ token: token, type: "Bearer" }));
        }
        else {
            response.status(app_1.StatusCodes.UNAUTHORIZED_ACCESS).send(new base_1.ErrorResponse("Invalid Password", app_1.ErrorCodes.validation_error));
        }
        return;
    }
    catch (err) {
        response.status(app_1.StatusCodes.UNPROCESSED_ENTITY).send(new base_1.ErrorResponse(err.message, app_1.ErrorCodes.unprocessed_entry));
    }
});
exports.default = LoginController;
