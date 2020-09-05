import { PaginateOptions, PaginateResult } from "mongoose";
import { Transaction } from "../entities";
import { CustomerModel } from "../models/customer";
import { TransactionModel } from "../models/transaction";

export class TransactionRepository {
    async save(payload: Transaction): Promise<Transaction> {
        return (await TransactionModel.create(payload)).toObject();
    }
    async update(_id : string ,payload: Transaction) : Promise<Transaction> {
        return (await TransactionModel.findByIdAndUpdate({ _id : _id}, payload)).toObject();
    }
    async findById(id: string): Promise<Transaction> {
        return TransactionModel.findById(id).lean() as any;
    }
    async pagination(filter: Transaction, paginationOptions: PaginateOptions): Promise<PaginateResult<any>> {
        return TransactionModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery: any): Promise<any> {
        return TransactionModel.find().lean() as any;
    }
}