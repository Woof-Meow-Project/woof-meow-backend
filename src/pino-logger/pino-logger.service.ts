import { Injectable, LoggerService } from '@nestjs/common';
import { PinoLogger } from "nestjs-pino";
import { loggerConfig } from "../common/logger.config";
@Injectable()
export class PinoLoggerService implements LoggerService {
    private readonly logger = new PinoLogger(loggerConfig);

    constructor() { }

    public setContext(context: string) {
        this.logger.setContext(context);
    }

    public log(message: string) {
        this.logger.info(message);
    }

    public debug(message: string) {
        this.logger.debug(message);
    }

    public error(message: string, trace?: string) {
        this.logger.error(message, trace);
    }

    public warn(message: string) {
        this.logger.warn(message);
    }
}
