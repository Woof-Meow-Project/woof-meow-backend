import { AbstractConfigService } from '@nestjs-library/config';
import { Injectable } from '@nestjs/common';
import { Expose, Transform, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { LogLevel } from './logger-config.service';

@Injectable()
export class PinoConfigService extends AbstractConfigService<PinoConfigService> {
    @Expose({ name: 'LOG_LEVEL' })
    @Transform(({ value }) => value ?? LogLevel.DEBUG)
    @Type(() => Number)
    @IsEnum(LogLevel)
    logLevel: LogLevel;
}