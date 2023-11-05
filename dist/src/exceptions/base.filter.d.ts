import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { PinoLoggerService as Logger } from '../pino-logger/pino-logger.service';
import { BaseHttpException } from './http-exceptions/base.http-exception';
export type classAndFunction = {
    class: string;
    function: string;
};
export declare const UNKNOWN_MESSAGE = "unknown";
export declare class BaseExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: Logger);
    catch(exception: BaseHttpException, host: ArgumentsHost): void;
    protected extractClassesAndFunctions(stack: string): classAndFunction[];
}
