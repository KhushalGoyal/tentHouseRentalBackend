import jwt, { sign, verify, decode } from "jsonwebtoken";
import { AppException } from "./appexception";
import { StatusCodes, ErrorCodes } from "../configs/app";

export const secretKey = "SalvdIaFwcKDyBoTJ4gVJHmzFrZrSi8ChghvsdbfQAZ";

export class TokensHelper {
    public static generateToken(payload: any, configs?: jwt.SignOptions) {
        return sign(payload, secretKey, configs)
    }

    public static verifyToken<T>(token: string, verifyOptions?: jwt.VerifyOptions){
        return verify(token, secretKey, verifyOptions) as any as T;
    }

    public static decodeToken<T>(token: string){
        return decode(token) as T;
    }

    public static getToken(authorization: string) {
        if(!authorization || authorization == "") AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, "Authorization Header Not Found" , ErrorCodes.validation_error)
        const isBearer = authorization.startsWith("Bearer");
        if (!isBearer) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, "Access/Refresh Should be Type Of Bearer", ErrorCodes.validation_error);
        const token = authorization.split(" ")[1];
        if(!token) AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, "Access/Refresh Token Is Missing" , ErrorCodes.access_token_missing)
        return token;
    }
}