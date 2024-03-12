import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { PinoLoggerService } from "./pino-logger/pino-logger.service";
import { AppModule } from "./app.module";
import { EnvConfigService } from "./env-config/env-config.service";
import { VersioningType } from "@nestjs/common";
import compression from '@fastify/compress';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const pinoLogger = new PinoLoggerService();
  pinoLogger.setContext('Bootstrap');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { logger: pinoLogger, snapshot: true },
  );

  // api versioning
  // app.enableVersioning({
  //   type: VersioningType.MEDIA_TYPE,
  //   key: 'v='
  // })

  const envConfigService = app.get(EnvConfigService)

  try {
    const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(envConfigService.swaggerEndpoint, app, document);

    await app.register(async (instance) => {
      instance.register(compression);
    });
    await app.listen(envConfigService.port);
    pinoLogger.debug(`${envConfigService.env} Server listening on port http://localhost:${envConfigService.port}`);
    pinoLogger.debug(`${envConfigService.env} Server api docs url : http://localhost:${envConfigService.port}/${envConfigService.swaggerEndpoint}`);
  } catch (error) {
    pinoLogger.error('Error during bootstrap:', error as string);
    process.exit(1);
  }
}

bootstrap();