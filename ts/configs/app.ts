export enum StatusCodes {
    OK=200,
    INTERNAL_SERVER_ERROR=500,
    UNPROCESSED_ENTITY=422,
    UNAUTHORIZED_ACCESS=401,
    UNAUTHORIZED_TOKEN=402,
    NOT_FOUND=404,
    BAD_REQUEST=400
}

export enum ErrorCodes {
    validation_error="validation_error",
    access_token_missing="access_token_missing",
    token_expired="token_expired",
    unprocessed_entry="unprocessed_entry"
}
export enum Methods {
    GET="GET",
    POST="POST",
    PUT="PUT",
    DELETE="DELETE"
}

export enum LogTypes {
    ERROR="ERROR",
    SUCCESS="SUCCESS"
}