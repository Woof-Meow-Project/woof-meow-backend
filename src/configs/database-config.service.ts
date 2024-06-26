import { Injectable } from '@nestjs/common';
import { AbstractConfigService } from '@nestjs-library/config';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class DatabaseConfigService extends AbstractConfigService<DatabaseConfigService> implements MysqlConnectionOptions {
    type = 'mysql' as const;
    // autoLoadEntities = true as const;

    @Expose({ name: 'DATABASE_HOST' })
    @Transform(({ value }) => value ?? 'localhost')
    @IsString()
    @IsNotEmpty()
    host: string;

    @Expose({ name: 'DATABASE_PORT' })
    @Type(() => Number)
    @Transform(({ value }) => value ?? 3306)
    @IsPositive()
    port: number;

    @Expose({ name: 'DATABASE_PASSWORD' })
    @Transform(({ value }) => value ?? '1234')
    @IsString()
    @IsNotEmpty()
    password: string;

    @Expose({ name: 'DATABASE_USER' })
    @Transform(({ value }) => value ?? 'root')
    @IsString()
    @IsNotEmpty()
    username: string;

    @Expose({ name: 'DATABASE_NAME' })
    @Transform(({ value }) => value ?? 'woofMeow')
    @IsString()
    @IsNotEmpty()
    database: string;
}