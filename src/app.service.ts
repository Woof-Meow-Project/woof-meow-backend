import { Injectable } from '@nestjs/common';
import { PinoLoggerService } from './pino-logger/pino-logger.service';

@Injectable()
export class AppService {
    private readonly logger: PinoLoggerService;

    constructor() {
        this.logger = new PinoLoggerService();
        this.logger.setContext(this.constructor.name);
    }
    getWelcomeMessage(): string {
        return 'Welcome to our API!';
    }

    getHealthStatus(): string {
        return 'API is up and running!';
    }

    getVersion(): string {
        return 'v1.0.0';
    }

    getEnv(): string {
        return process.env.NODE_ENV || 'local';
    }
}
