import { PaginateOptions, PaginateResult } from "mongoose";
import { Customer } from "../entities";
import { CustomerModel } from "../models/customer";

export class CustomerRepository {
    async save(payload: Customer): Promise<Customer> {
        return (await CustomerModel.create(payload)).toObject();
    }
    async update(_id : string ,payload: Customer) : Promise<Customer> {
        return (await CustomerModel.findByIdAndUpdate({ _id : _id}, payload)).toObject();
    }
    async findById(id: string): Promise<Customer> {
        return CustomerModel.findById(id).lean() as any;
    }
    async pagination(filter: Customer, paginationOptions: PaginateOptions): Promise<PaginateResult<any>> {
        return CustomerModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery: any): Promise<any> {
        return CustomerModel.find().lean() as any;
    }
}