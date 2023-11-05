import { HttpException } from "@nestjs/common";

export type ExceptionInfo = {
    [key: string]: any;
};


/**
 * Base Http Exception
 * @date 2023. 10. 9. - 오후 3:56:47
 *
 * @export
 * @class BaseHttpException
 * @extends {HttpException}
 */
export class BaseHttpException extends HttpException {
    sourceClass?: string;
    sourceFunction?: string;
    info?: ExceptionInfo = {};

    constructor({
        response,
        status,
        sourceClass = '',
        sourceFunction = '',
        info = {}
    }: {
        response: string | Record<string, any>;
        status: number;
        sourceClass?: string;
        sourceFunction?: string;
        info?: ExceptionInfo;
    }) {
        super(response, status);
        this.sourceClass = sourceClass;
        this.sourceFunction = sourceFunction;
        this.info = info;
    }

    static throw({
        message,
        status,
        sourceClass,
        sourceFunction,
        info
    }: {
        message: string;
        status: number;
        sourceClass?: string;
        sourceFunction?: string;
        info?: ExceptionInfo;
    }) {
        throw new BaseHttpException({ response: message, status, sourceClass, sourceFunction, info });
    }
}
