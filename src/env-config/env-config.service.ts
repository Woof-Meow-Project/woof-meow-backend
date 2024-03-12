import { Injectable } from '@nestjs/common';
import { AbstractConfigService } from '@nestjs-library/config';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

@Injectable()
export class EnvConfigService extends AbstractConfigService<EnvConfigService> {
    @Expose({ name: 'NODE_ENV' })
    @Transform(({ value }) => value ?? 'local')
    @IsString()
    @IsNotEmpty()
    env: string;

    @Expose({ name: 'DEFAULT_PORT' })
    @Type(() => Number)
    @Transform(({ value }) => value ?? 3000)
    @IsPositive()
    port: number;

    @Expose({ name: 'SWAGGER_ENDPOINT' })
    @Transform(({ value }) => value ?? 'api-docs')
    @IsString()
    @IsNotEmpty()
    swaggerEndpoint: string;
}