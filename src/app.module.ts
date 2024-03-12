import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { BaseExceptionFilter } from './exceptions';
import { APP_FILTER } from '@nestjs/core';
import { PinoLoggerModule } from './pino-logger/pino-logger.module';
import { ConfigModule } from '@nestjs-library/config';
import { DatabaseConfigService } from './database-config/database-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigService } from './env-config/env-config.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PinoLoggerModule,
    ConfigModule.forFeature(DatabaseConfigService),
    ConfigModule.forFeature(EnvConfigService),
    TypeOrmModule.forRootAsync({
      name: 'mysqlConnection',
      imports: [ConfigModule.forFeature(DatabaseConfigService)],
      useFactory: (configService: DatabaseConfigService) => ({
        type: 'mysql',
        host: configService.host,
        port: configService.port,
        username: configService.username,
        password: configService.password,
        database: configService.database,
      }),
      inject: [DatabaseConfigService],
    }),
    AuthModule,
    UsersModule,

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
