import { AbstractService, RequestQuery } from "../controllers/base";
import { Customer } from "../entities";
import { CustomerRepository } from "../repository/customer";

export class CustomerService extends AbstractService<Customer> {
    customerRepository = new CustomerRepository()
    public create = async (body: Customer): Promise<Customer> => {
        return this.customerRepository.save(body)
    }   

    public get = async (_id : string) : Promise<Customer> => {
        return this.customerRepository.findById(_id)
    }

    public getAll = async (query : any) : Promise<any> => {
        const requestQuery = this.getQuery(query)
        return this.customerRepository.getAll(requestQuery)
    }
}