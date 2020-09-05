"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorLogs = exports.Logs = void 0;
const app_1 = require("../configs/app");
class Logs {
    constructor(message, statusCode, type) {
        this.message = message;
        this.statusCode = statusCode;
        this.type = type;
    }
}
exports.Logs = Logs;
class ErrorLogs extends Logs {
    constructor(message, statusCode, errorStack) {
        super(message, statusCode, app_1.LogTypes.ERROR);
        this.stack = errorStack;
    }
}
exports.ErrorLogs = ErrorLogs;
