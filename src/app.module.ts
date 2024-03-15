import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { BaseExceptionFilter } from './exceptions';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs-library/config';
import { DatabaseConfigService } from './configs/database-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigService } from './configs/app-config.service';
import { PinoLoggerModule } from './pino-logger/pino-logger.module';

@Module({
  imports: [
    ConfigModule.forFeature(AppConfigService),
    PinoLoggerModule,
    ConfigModule.forFeature(DatabaseConfigService),
    TypeOrmModule.forRootAsync({
      name: 'mysqlConnection',
      imports: [ConfigModule.forFeature(DatabaseConfigService)],
      useFactory: (configService: DatabaseConfigService) => configService,
      inject: [DatabaseConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    }
  ],
  exports: [
    AppService
  ]
})
export class AppModule {
  constructor() { }
}
