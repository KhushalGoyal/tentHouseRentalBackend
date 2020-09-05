import { AbstractService, RequestQuery } from "../controllers/base";
import { TransactionRepository } from "../repository/transactions";
import { Transaction } from "../entities/transaction";
import { ProductReprository } from "../repository/product";

export class TransactionService extends AbstractService<Transaction> {
    transactionRepository = new TransactionRepository()
    productRepository = new ProductReprository()
    public create = async (body: Transaction): Promise<Transaction> => {
        return this.transactionRepository.save(body)
    }   

    public get = async (_id : string) : Promise<Transaction> => {
        return this.transactionRepository.findById(_id)
    }

    public getAll = async (query : any) : Promise<any> => {
        const requestQuery = this.getQuery(query)
        return this.transactionRepository.getAll(requestQuery)
    }

    public appendBookedProduct = async (_id: any, quantity : any) : Promise<any> => {
        let product = await this.productRepository.findById(_id);
        product.quantity_booked = product.quantity_booked + parseInt(quantity)
        return this.productRepository.update(_id, product)
    }

    public substractBookedProduct = async (_id: any, quantity : any) : Promise<any> => {
        let product = await this.productRepository.findById(_id);
        product.quantity_booked = product.quantity_booked - parseInt(quantity)
        return this.productRepository.update(_id, product)
    }

    public checkForIfCanMakeOutTransaction = async (_id: any, quantity : any ) : Promise<any> => {
        let product = await this.productRepository.findById(_id);
        return (product.quantity_total - product.quantity_booked) >= parseInt(quantity) ? true : false;
    }

    public checkForIfCanMakeInTransaction = async ( _id: any, quantity : any) : Promise<any> => {
        let product = await this.productRepository.findById(_id);
        console.log(product.quantity_total,product.quantity_booked,quantity)
        return product.quantity_total >= parseInt(quantity) ? true : false;
    }
}