import { Injectable } from '@nestjs/common';
import { PinoLoggerService } from './pino-logger/pino-logger.service';
import { DatabaseConfigService } from './database-config/database-config.service';
import { EnvConfigService } from './env-config/env-config.service';

@Injectable()
export class AppService {
    private readonly logger: PinoLoggerService;
    private readonly databaseConfigService: DatabaseConfigService;
    private readonly envConfigService: EnvConfigService;

    constructor() {
        this.logger = new PinoLoggerService();
        this.logger.setContext(this.constructor.name);
    }

    getWelcomeMessage(): string {
        return 'Welcome to our API!';
    }

    getDatabaseConfig() {
        return this.databaseConfigService;
    }

    getEnvConfig() {
        return this.envConfigService;
    }
}
