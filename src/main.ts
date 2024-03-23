import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import compression from '@fastify/compress';
import { AppConfigService } from "./configs/app-config.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PinoLoggerService } from "./pino-logger/pino-logger.service";

async function bootstrap() {
  const pinoLogger = new PinoLoggerService();
  pinoLogger.setContext('Bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true, connectionTimeout: 3000 }),
    { logger: pinoLogger, snapshot: true },
  );
  const appConfigService = app.get(AppConfigService);

  try {
    const config = new DocumentBuilder()
      .setTitle('WoofMeow API docs')
      .setDescription('The WoofMeow API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(appConfigService.swaggerPath, app, document);

    await app.register(async (instance) => {
      instance.register(compression);
    });
    await app.listen(appConfigService.listeningPort);
    pinoLogger.debug(`${appConfigService.env} Server listening on port http://localhost:${appConfigService.listeningPort}`);
    pinoLogger.debug(`${appConfigService.env} Server api docs url : http://localhost:${appConfigService.listeningPort}/${appConfigService.swaggerPath}`);
  } catch (error) {
    pinoLogger.error('Error during bootstrap:', error as string);
    process.exit(1);
  }
}

bootstrap();