"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogTypes = exports.Methods = exports.ErrorCodes = exports.StatusCodes = void 0;
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    StatusCodes[StatusCodes["UNPROCESSED_ENTITY"] = 422] = "UNPROCESSED_ENTITY";
    StatusCodes[StatusCodes["UNAUTHORIZED_ACCESS"] = 401] = "UNAUTHORIZED_ACCESS";
    StatusCodes[StatusCodes["UNAUTHORIZED_TOKEN"] = 402] = "UNAUTHORIZED_TOKEN";
    StatusCodes[StatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCodes[StatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
})(StatusCodes = exports.StatusCodes || (exports.StatusCodes = {}));
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["validation_error"] = "validation_error";
    ErrorCodes["access_token_missing"] = "access_token_missing";
    ErrorCodes["token_expired"] = "token_expired";
    ErrorCodes["unprocessed_entry"] = "unprocessed_entry";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
var Methods;
(function (Methods) {
    Methods["GET"] = "GET";
    Methods["POST"] = "POST";
    Methods["PUT"] = "PUT";
    Methods["DELETE"] = "DELETE";
})(Methods = exports.Methods || (exports.Methods = {}));
var LogTypes;
(function (LogTypes) {
    LogTypes["ERROR"] = "ERROR";
    LogTypes["SUCCESS"] = "SUCCESS";
})(LogTypes = exports.LogTypes || (exports.LogTypes = {}));
