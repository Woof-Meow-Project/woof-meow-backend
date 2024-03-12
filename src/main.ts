import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { PinoLoggerService } from "./pino-logger/pino-logger.service";
import { AppModule } from "./app.module";


async function bootstrap() {
  const pinoLogger = new PinoLoggerService();
  pinoLogger.setContext('Bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { logger: pinoLogger }
  );

  try {
    await app.listen(3000);
    pinoLogger.debug(`Server listening on port http://localhost:3000`);
  } catch (error) {
    pinoLogger.error('Error during bootstrap:', error as string);
    process.exit(1);
  }
}

bootstrap();