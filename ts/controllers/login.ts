import { Router, Request, Response, NextFunction } from "express";
import { PasswordHelper } from "../helpers/password";
import { UserModel } from "../models";
import { ErrorResponse, SuccessResponse } from "../base";
import { ErrorCodes, StatusCodes } from "../configs/app";
import { TokensHelper } from "../helpers/token";
import { User } from "../entities";

const LoginController: Router = Router()


LoginController.post("/", async (request: Request, response: Response, next : NextFunction) => {
    try{
        let body = request.body;
        if(!body.username || !body.password){
            response.status(StatusCodes.UNAUTHORIZED_ACCESS).send(new ErrorResponse("Invalid Request, Password/Username is missing", ErrorCodes.validation_error))
        }
        let user = await UserModel.findOne({ email : body.username }).lean() as any as User;
        console.log(user)
        let isValid = PasswordHelper.compare(body.password, user.password)
        let token = TokensHelper.generateToken(user, { expiresIn: '1h' })
        if(isValid){
            response.status(StatusCodes.OK).send(new SuccessResponse({ token : token, type : "Bearer"}))
        }else{
            response.status(StatusCodes.UNAUTHORIZED_ACCESS).send(new ErrorResponse("Invalid Password", ErrorCodes.validation_error))
        }
        return
    }catch(err){
        response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(err.message, ErrorCodes.unprocessed_entry))
    }
})

export default LoginController;