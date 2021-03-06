import { TokensHelper } from "./token";
import { User } from "../entities";
import { StatusCodes, ErrorCodes } from "../configs/app";

export function AuthGuard(): any {
    return (request: any, response: any, next: any) => {
        try {
            const hash = TokensHelper.getToken(request.headers.authorization);
            const tokenPayload = TokensHelper.verifyToken<User>(hash);
            response.locals.user = tokenPayload;
            next();
        } catch (error) {
            console.log(request.baseUrl.includes("refreshToken"))
            if(error.name == "TokenExpiredError" && request.baseUrl.includes("refreshToken")){
                error.statusCode = StatusCodes.UNAUTHORIZED_TOKEN;
                error.errorCode = ErrorCodes.token_expired;
            }else if(error.name == "TokenExpiredError"){
                error.statusCode = StatusCodes.UNAUTHORIZED_ACCESS;
                error.errorCode = ErrorCodes.token_expired;
            }
            next(error);
        }
    }
}