import { LoggerService } from '@nestjs/common';
export declare class PinoLoggerService implements LoggerService {
    private readonly logger;
    constructor();
    setContext(context: string): void;
    log(message: string): void;
    debug(message: string): void;
    error(message: string, trace?: string): void;
    warn(message: string): void;
}
