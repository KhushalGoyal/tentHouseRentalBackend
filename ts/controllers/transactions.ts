import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes, ErrorCodes } from "../configs";
import { ErrorResponse } from "../base";
import { TransactionService } from "../service/transactions";
import { TransactionValidation } from "../validation/transactions";
import { ProductService } from "../service/products";
import { check } from "express-validator";

const TransactionController: Router = Router()

TransactionController.get("/" ,  async (request: Request, response: Response, next : NextFunction) => {
    try {
        let transactionService : TransactionService =   new TransactionService(response.locals.user)
        
        response.status(StatusCodes.OK).send(await transactionService.getAll(request.query))
        return
    } catch (error) {
        response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(error.message, ErrorCodes.unprocessed_entry))
    }
})

TransactionController.post("/" , TransactionValidation.create() , async (request: Request, response: Response, next : NextFunction) => {
    try {
        let transactionService : TransactionService =   new TransactionService(response.locals.user)        
        let body = request.body;
        if(body.transaction_type == 'OUT'){
            let checkIf = await transactionService.checkForIfCanMakeOutTransaction(body.product_id, body.quantity)
            if(checkIf){
                let product = await transactionService.create(body)
                await transactionService.appendBookedProduct(body.product_id, body.quantity)
                if(product){
                    response.status(StatusCodes.OK).send(await transactionService.getAll(request.query))
                }else{
                    response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse({}, ErrorCodes.unprocessed_entry))
                }
                return
            }else{
                response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse("Invalid Transaction", ErrorCodes.unprocessed_entry))
            }
        }else{
            let checkIf = await transactionService.checkForIfCanMakeInTransaction(body.product_id, body.quantity)
            if(checkIf){
                let product = await transactionService.create(body)
                await transactionService.substractBookedProduct(body.product_id, body.quantity)
                if(product){
                    response.status(StatusCodes.OK).send(await transactionService.getAll(request.query))
                }else{
                    response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse({}, ErrorCodes.unprocessed_entry))
                } 
            }else{
                response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse("Invalid Transaction", ErrorCodes.unprocessed_entry))
            }
            return
        }
        
        return
    } catch (error) {
        response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(error.message, ErrorCodes.unprocessed_entry))
    }
})

export default TransactionController;