/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { AppException } from "./appexception";
import { StatusCodes, ErrorCodes } from "../configs";
import { ErrorResponse } from "../base";
/**
 * Error Handling Middleware - It is responsible to sent all type of errors and log them in database
 * @param error - error
 * @param request - request payload
 * @param response - resposne
 * @param next - next middleware
 */
export function errorHandler(error: AppException, request: Request, response: Response, next: NextFunction): void {
    const statusCode = error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
    console.error("Loggin Error: ", error);
    // errorLogger(err, request.originalUrl);
    response.status(statusCode).send(new ErrorResponse(error.message, error.errorCode));
}