"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppException extends Error {
    constructor(statusCode, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.default = AppException;
