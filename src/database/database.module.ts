import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PinoLoggerModule } from 'src/pino-logger/pino-logger.module';

@Module({
    imports: [PinoLoggerModule], // Ensure this import exists
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule { }
