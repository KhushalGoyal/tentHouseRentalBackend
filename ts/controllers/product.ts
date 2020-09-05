import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes, ErrorCodes } from "../configs";
import { ErrorResponse } from "../base";
import { ProductService } from "../service/products";
import { ProductValidation } from "../validation/product";

const ProductController: Router = Router()

ProductController.get("/" ,  async (request: Request, response: Response, next : NextFunction) => {
    try {
        let productService : ProductService =   new ProductService(response.locals.user)
        
        response.status(StatusCodes.OK).send(await productService.getAll(request.query))
        return
    } catch (error) {
        response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(error.message, ErrorCodes.unprocessed_entry))
    }
})

ProductController.post("/" , ProductValidation.create() , async (request: Request, response: Response, next : NextFunction) => {
    try {
        let productService : ProductService =   new ProductService(response.locals.user)

        let body = request.body;
        body.quantity_booked = body.quantity_booked ? body.quantity_booked : 0

        let product = await productService.create(body)
        if(product){
            response.status(StatusCodes.OK).send(await productService.getAll(request.query))
        }else{
            response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse({}, ErrorCodes.unprocessed_entry))
        }

    } catch (error) {
        response.status(StatusCodes.UNPROCESSED_ENTITY).send(new ErrorResponse(error.message, ErrorCodes.unprocessed_entry))
    }
})

export default ProductController;