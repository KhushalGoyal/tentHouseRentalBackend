import { PaginateOptions, PaginateResult } from "mongoose";
import { User } from "../entities";
import { UserModel } from "../models";
import { RequestQuery } from "../controllers/base";

export class UserReprository {
    async save(payload: User): Promise<User> {
        return (await UserModel.create(payload)).toObject();
    }
    async update(_id : string ,payload: User) : Promise<User> {
        return (await UserModel.findByIdAndUpdate({ _id : _id}, payload)).toObject();
    }
    async findById(id: string): Promise<User> {
        return UserModel.findById(id).lean() as any;
    }
    async findByType(type: string): Promise<User> {
        return UserModel.findOne({ type : type }).lean() as any as User;
    }
    async pagination(filter: User, paginationOptions: PaginateOptions): Promise<PaginateResult<any>> {
        return UserModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery: RequestQuery<User>): Promise<any> {
        return UserModel.find(requestQuery).lean() as any;
    }
}