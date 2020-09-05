import { validationResult } from "express-validator";
import { ErrorResponse } from "../base";
import { ErrorCodes, StatusCodes } from "../configs/app";

export function validatePayload(request: any, response: any, next: any){
    const error = validationResult(request);
    if(!error.isEmpty()){
        const mappedError = error.array().map((el) => ({ key: el.param, message: el.msg, value: el.value }));
        response.status(StatusCodes.BAD_REQUEST).send(new ErrorResponse(mappedError));
        return;
    } else {
        next();
    }
}
