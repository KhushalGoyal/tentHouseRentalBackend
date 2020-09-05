import { User } from "../entities";
import { UserReprository } from "../repository/user";
import { PasswordHelper } from "../helpers/password";
import { UserModel } from "../models";

export class UserService {
    userRepository = new UserReprository()
    public create = async (body: User): Promise<User> => {
        return this.userRepository.save(body)
    }   

    public get = async (_id : string) : Promise<User> => {
        return this.userRepository.findById(_id)
    }
}

export async function getByType(_type : string) : Promise<User>{
    return UserModel.findOne({ type : _type }).lean() as any as User;   
}

export async function addDefaultUser(payload: any) : Promise<any> {
    console.log(payload)
    payload.password = PasswordHelper.encrypt(payload.password);
    payload.type = 'DEFAULT';

    return new Promise((resolve: any, reject : any) =>{
        UserModel.create(payload, function(err: any, res: any){
            if(err){
                reject(err)
                return
            }
            resolve(res)
            return
        })
    })
}