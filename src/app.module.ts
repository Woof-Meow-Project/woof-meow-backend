import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { BaseExceptionFilter } from './exceptions';
import { APP_FILTER } from '@nestjs/core';
import { PinoLoggerModule } from './pino-logger/pino-logger.module';

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
    PinoLoggerModule
  ],
})
export class AppModule { }
