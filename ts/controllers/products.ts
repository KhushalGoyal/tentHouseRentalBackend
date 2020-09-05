import { AbstractService, RequestQuery } from "./base";
import { Product } from "../entities";
import { ProductReprository } from "../repository/product";

export class ProductService extends AbstractService<Product> {
    productRepository = new ProductReprository()
    public create = async (body: Product): Promise<Product> => {
        return this.productRepository.save(body)
    }   

    public get = async (_id : string) : Promise<Product> => {
        return this.productRepository.findById(_id)
    }

    public getAll = async (query : RequestQuery<Product>) : Promise<any> => {
        const requestQuery = this.getQuery(query)
        return this.productRepository.getAll(requestQuery)
    }
}