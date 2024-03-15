import { AbstractConfigService } from '@nestjs-library/config';
import { Injectable } from '@nestjs/common';
import { Expose, Transform, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';

export enum LogLevel {
    INFO = 'INFO',
    DEBUG = 'DEBUG',
    TRACE = 'TRACE',
    WARN = 'WARN',
    ERROR = 'ERROR',
    FATAL = 'FATAL',
    SILENT = 'SILENT',
}

@Injectable()
export class LoggerConfigService extends AbstractConfigService<LoggerConfigService> {
    @Expose({ name: 'LOG_LEVEL' })
    @Transform(({ value }) => value ?? LogLevel.INFO)
    @Type(() => Number)
    @IsEnum(LogLevel)
    logLevel: LogLevel;
}