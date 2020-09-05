import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes, ErrorCodes } from "../configs";
import { ErrorResponse } from "../base";

const RefreshTokenController: Router = Router()

RefreshTokenController.post("/refreshToken", async (request: Request, response: Response, next : NextFunction) => {
    try{
        let user = response.locals.user
        if(user){
            console.log(user)
        }
        response.status(StatusCodes.UNAUTHORIZED_TOKEN).send(new ErrorResponse("User not found", ErrorCodes.validation_error))
        return
    }catch(err){
        response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(err.message, ErrorCodes.unprocessed_entry))
    }
})

export default RefreshTokenController;