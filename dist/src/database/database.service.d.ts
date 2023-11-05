import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PinoLoggerService } from '../pino-logger/pino-logger.service';
export declare class DatabaseService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService, logger: PinoLoggerService);
    getConnectionOptions(): TypeOrmModuleOptions;
    createTypeOrmOptions(): Promise<TypeOrmModuleOptions>;
}
