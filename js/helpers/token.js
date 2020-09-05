"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensHelper = exports.secretKey = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const appexception_1 = require("./appexception");
const app_1 = require("../configs/app");
exports.secretKey = "SalvdIaFwcKDyBoTJ4gVJHmzFrZrSi8ChghvsdbfQAZ";
class TokensHelper {
    static generateToken(payload, configs) {
        return jsonwebtoken_1.sign(payload, exports.secretKey, configs);
    }
    static verifyToken(token, verifyOptions) {
        return jsonwebtoken_1.verify(token, exports.secretKey, verifyOptions);
    }
    static decodeToken(token) {
        return jsonwebtoken_1.decode(token);
    }
    static getToken(authorization) {
        if (!authorization || authorization == "")
            appexception_1.AppException.create(app_1.StatusCodes.UNAUTHORIZED_ACCESS, "Authorization Header Not Found", app_1.ErrorCodes.validation_error);
        const isBearer = authorization.startsWith("Bearer");
        if (!isBearer)
            appexception_1.AppException.create(app_1.StatusCodes.UNAUTHORIZED_ACCESS, "Access/Refresh Should be Type Of Bearer", app_1.ErrorCodes.validation_error);
        const token = authorization.split(" ")[1];
        if (!token)
            appexception_1.AppException.create(app_1.StatusCodes.UNAUTHORIZED_ACCESS, "Access/Refresh Token Is Missing", app_1.ErrorCodes.access_token_missing);
        return token;
    }
}
exports.TokensHelper = TokensHelper;
