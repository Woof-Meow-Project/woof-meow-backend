import { HttpException } from "@nestjs/common";
export type ExceptionInfo = {
    [key: string]: any;
};
export declare class BaseHttpException extends HttpException {
    sourceClass?: string;
    sourceFunction?: string;
    info?: ExceptionInfo;
    constructor({ response, status, sourceClass, sourceFunction, info }: {
        response: string | Record<string, any>;
        status: number;
        sourceClass?: string;
        sourceFunction?: string;
        info?: ExceptionInfo;
    });
    static throw({ message, status, sourceClass, sourceFunction, info }: {
        message: string;
        status: number;
        sourceClass?: string;
        sourceFunction?: string;
        info?: ExceptionInfo;
    }): void;
}
