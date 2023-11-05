import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { BaseExceptionFilter } from './exceptions';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerModule } from './pino-logger/pino-logger.module';
import { UsersModule } from './api/users/users.module';
import { PetsModule } from './api/pets/pets.module';
import { DatabaseService } from './database/database.service';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    }
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`
    }),
    PinoLoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, PinoLoggerModule],
      useClass: DatabaseService,
    }),
    UsersModule,
    PetsModule
  ],
})
export class AppModule { }
