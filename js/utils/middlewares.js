"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../configs/app");
const errors_1 = require("../entities/errors");
const base_1 = require("../base");
const models_1 = __importDefault(require("../base/models"));
/**
 * Error Handling Middleware - It is responsible to sent all type of errors ans log them in database
 * @param err - error
 * @param request - request payload
 * @param response - resposne
 * @param next - next middleware
 */
function errorHandler(err, request, response, next) {
    const statusCode = err.statusCode ? err.statusCode : app_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const logsEntity = new errors_1.ErrorLogs(err.message, statusCode, err.stack);
    models_1.default.create(logsEntity);
    response.status(err.statusCode ? err.statusCode : app_1.StatusCodes.INTERNAL_SERVER_ERROR).send(new base_1.ErrorResponse(err.message));
}
exports.default = errorHandler;
