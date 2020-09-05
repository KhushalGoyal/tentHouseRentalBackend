import { LogTypes } from "../configs/app";

export class Logs {
    public createdAt: Date;
    public message: string;
    public statusCode: number;
    public type: LogTypes;
    constructor(message: string, statusCode: number, type: LogTypes) {
        this.message = message;
        this.statusCode = statusCode;
        this.type = type;
    }
}

export class ErrorLogs extends Logs {
    stack: any;
    constructor(message: string, statusCode: number, errorStack: any) {
        super(message, statusCode, LogTypes.ERROR);
        this.stack = errorStack;
    }
}
