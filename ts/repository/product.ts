import { PaginateOptions, PaginateResult } from "mongoose";
import { RequestQuery } from "../controllers/base";
import { ProductModel } from "../models/product";
import { Product } from "../entities";

export class ProductReprository {
    async save(payload: Product): Promise<Product> {
        return (await ProductModel.create(payload)).toObject();
    }
    async update(_id : string ,payload: Product) : Promise<Product> {
        return (await ProductModel.findByIdAndUpdate({ _id : _id}, payload)).toObject();
    }
    async findById(id: string): Promise<Product> {
        return ProductModel.findById(id).lean() as any;
    }
    async pagination(filter: Product, paginationOptions: PaginateOptions): Promise<PaginateResult<any>> {
        return ProductModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery: any): Promise<any> {
        return ProductModel.find().lean() as any;
    }
}