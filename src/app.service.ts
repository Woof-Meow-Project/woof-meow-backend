import { Injectable } from '@nestjs/common';
import { DatabaseConfigService } from './configs/database-config.service';
import { AppConfigService, NodeEnvironment } from './configs/app-config.service';
import { PinoLoggerService } from './pino-logger/pino-logger.service';

@Injectable()
export class AppService {
    public appConfigService: AppConfigService;
    public logger: PinoLoggerService;
    public databaseConfigService: DatabaseConfigService;

    constructor() {
        this.logger = new PinoLoggerService();
        this.logger.setContext(this.constructor.name);
    }
    getWelcomeMessage(): string {
        return 'Welcome to our API!!!!!';
    }
}
