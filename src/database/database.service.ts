import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PinoLoggerService } from '../pino-logger/pino-logger.service';

@Injectable()
export class DatabaseService {
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: PinoLoggerService
    ) {
        this.logger.setContext(this.constructor.name);
    }

    getConnectionOptions(): TypeOrmModuleOptions {
        const isLocal = this.configService.get<string>('NODE_ENV') === 'local';
        this.logger.debug(`getConnectionOptions() : ${isLocal ? 'local' : 'production'}`);

        if (isLocal) {
            return {
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '1234',
                database: 'WoofMeow',
                synchronize: true,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                logging: true,
            };
        }
        return {
            type: 'mysql',
            host: this.configService.get<string>('DATABASE_HOST'),
            port: this.configService.get<number>('DATABASE_PORT'),
            username: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            database: this.configService.get<string>('DATABASE_NAME'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
    }

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        this.logger.debug('createTypeOrmOptions()');
        return this.getConnectionOptions();
    }
}
