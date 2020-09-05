import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes, ErrorCodes } from "../configs";
import { ErrorResponse } from "../base";
import { CustomerService } from "../service/customer";
import { CustomerValidation } from "../validation/customer";

const CustomerController: Router = Router()

CustomerController.get("/" ,  async (request: Request, response: Response, next : NextFunction) => {
    try {
        let customerService : CustomerService =   new CustomerService(response.locals.user)
        
        response.status(StatusCodes.OK).send(await customerService.getAll(request.query))
        return
    } catch (error) {
        response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(error.message, ErrorCodes.unprocessed_entry))
    }
})

CustomerController.post("/" , CustomerValidation.create() , async (request: Request, response: Response, next : NextFunction) => {
    try {
        let customerService : CustomerService =   new CustomerService(response.locals.user)
        let body = request.body;
        let product = await customerService.create(body)
        if(product){
            response.status(StatusCodes.OK).send(await customerService.getAll(request.query))
        }else{
            response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse({}, ErrorCodes.unprocessed_entry))
        }

    } catch (error) {
        response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(error.message, ErrorCodes.unprocessed_entry))
    }
})

export default CustomerController;