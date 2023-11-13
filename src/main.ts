import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { ValidationPipe } from "@nestjs/common";
import compression from '@fastify/compress';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from '@nestjs/config';
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

  const configService = app.get(ConfigService);

  const DEFAULT_PORT = configService.get<number>('DEFAULT_PORT', 3000);
  const SWAGGER_ENDPOINT = configService.get<string>('SWAGGER_ENDPOINT', 'api-docs');
  const COOKIE_SECRET_SUFFIX = configService.get<string>('COOKIE_SECRET_SUFFIX', 'default_suffix');
  const env = configService.get<string>('NODE_ENV', 'dev');

  setupSwagger(app, SWAGGER_ENDPOINT, env, pinoLogger);
  setupSecurity(app);
  setupCompression(app);
  setupCookies(app, COOKIE_SECRET_SUFFIX, env);
  setupValidation(app);

  try {
    await app.listen(DEFAULT_PORT);
    pinoLogger.debug(`Server listening on port http://localhost:${DEFAULT_PORT}`);
  } catch (error) {
    pinoLogger.error('Error during bootstrap:', error as string);
    process.exit(1);
  }
}

function setupSecurity(app: NestFastifyApplication) {
  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
        scriptSrc: ["'self'"], // Removed 'unsafe-inline' for better security
      },
    },
  });
}

function setupCompression(app: NestFastifyApplication) {
  app.register(compression, { encodings: ['gzip', 'deflate'] });
}

function setupCookies(app: NestFastifyApplication, COOKIE_SECRET_SUFFIX: string, env: string) {
  app.register(cookie, {
    secret: `${env}-${COOKIE_SECRET_SUFFIX}`
  });
}

function setupValidation(app: NestFastifyApplication) {
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip validated objects of any properties that do not use any decorators
    forbidNonWhitelisted: true, // Throw errors when non-whitelisted values are provided
    transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  }));
}

function setupSwagger(app: NestFastifyApplication, SWAGGER_ENDPOINT: string, env: string, logger: PinoLoggerService) {
  const version = env === 'local'
    ? 'local'
    : '1.0.0'; // Use a static version or a strategy that aligns with your API versioning

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description')
    .setVersion(version)
    .build()
  );

  SwaggerModule.setup(SWAGGER_ENDPOINT, app, document);
  logger.debug(`Swagger is available at http://localhost:3000/${SWAGGER_ENDPOINT}`);
}

bootstrap();