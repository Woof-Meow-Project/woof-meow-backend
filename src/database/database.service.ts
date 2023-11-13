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

        this.logger.debug('getConnectionOptions() : ' + this.configService.get<string>('NODE_ENV'));
        return {
            type: 'mysql',
            host: this.configService.get<string>('DATABASE_HOST'),
            port: this.configService.get<number>('DATABASE_PORT'),
            username: this.configService.get<string>('DATABASE_USER'),
            password: this.configService.get<string>('DATABASE_PASSWORD'),
            database: this.configService.get<string>('DATABASE_NAME'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            logging: true,
        };

    }

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return this.getConnectionOptions();
    }
}
