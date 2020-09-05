"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const token_1 = require("./token");
const app_1 = require("../configs/app");
function AuthGuard() {
    return (request, response, next) => {
        try {
            const hash = token_1.TokensHelper.getToken(request.headers.authorization);
            const tokenPayload = token_1.TokensHelper.verifyToken(hash);
            response.locals.user = tokenPayload;
            next();
        }
        catch (error) {
            if (error.name == "TokenExpiredError") {
                error.statusCode = app_1.StatusCodes.UNAUTHORIZED_ACCESS;
                error.errorCode = app_1.ErrorCodes.token_expired;
            }
            next(error);
        }
    };
}
exports.AuthGuard = AuthGuard;
