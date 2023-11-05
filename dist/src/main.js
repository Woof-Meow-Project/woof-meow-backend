"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const common_1 = require("@nestjs/common");
const compress_1 = require("@fastify/compress");
const cookie_1 = require("@fastify/cookie");
const helmet_1 = require("@fastify/helmet");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("../src/app.module");
const config_1 = require("@nestjs/config");
const pino_logger_service_1 = require("./pino-logger/pino-logger.service");
async function bootstrap() {
    const pinoLogger = new pino_logger_service_1.PinoLoggerService();
    pinoLogger.setContext('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({ trustProxy: true }), { logger: pinoLogger });
    const configService = app.get(config_1.ConfigService);
    const DEFAULT_PORT = configService.get('DEFAULT_PORT', 3000);
    const SWAGGER_ENDPOINT = configService.get('SWAGGER_ENDPOINT', 'api-docs');
    const COOKIE_SECRET_SUFFIX = configService.get('COOKIE_SECRET_SUFFIX', 'secret');
    const env = configService.get('NODE_ENV', 'local');
    const isEnvDevelop = configService.get('NODE_ENV', 'local') === 'local';
    if (isEnvDevelop) {
        setupSwagger(app, SWAGGER_ENDPOINT, env, pinoLogger);
    }
    setupSecurity(app, isEnvDevelop);
    setupCompression(app);
    setupCookies(app, COOKIE_SECRET_SUFFIX, env);
    setupValidation(app);
    await app.listen(DEFAULT_PORT).then(() => {
        pinoLogger.debug('###################################################');
        pinoLogger.debug(`🚀 SEVER LISTENING ON PORT \x1b[4mhttp://localhost:${DEFAULT_PORT}\x1b[0m 🎉`);
        pinoLogger.debug('###################################################');
    }).catch((error) => {
        pinoLogger.error('Error during bootstrap:', error);
        process.exit(1);
    });
}
function setupSecurity(app, isEnvDevelop) {
    const helmetOptions = isEnvDevelop ? {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            },
        },
    } : undefined;
    app.register(helmet_1.default, helmetOptions);
}
function setupCompression(app) {
    app.register(compress_1.default, { encodings: ['gzip', 'deflate'] });
}
function setupCookies(app, COOKIE_SECRET_SUFFIX, env) {
    app.register(cookie_1.default, {
        secret: `${env}-${COOKIE_SECRET_SUFFIX}`,
    });
}
function setupValidation(app) {
    app.useGlobalPipes(new common_1.ValidationPipe());
}
function setupSwagger(app, SWAGGER_ENDPOINT, env, logger) {
    const version = env === 'local'
        ? 'local'
        : `${new Date().toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
        })}`;
    const document = swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
        .setTitle('Woof-Meow-Backend API')
        .setDescription('API description')
        .setVersion(version)
        .addTag('Woof-Meow-Backend')
        .build());
    swagger_1.SwaggerModule.setup(SWAGGER_ENDPOINT, app, document, {
        swaggerOptions: {
            docExpansion: 'list',
            deepLinking: true,
            defaultModelRendering: 'model',
            displayRequestDuration: true,
            defaultModelsExpandDepth: 10,
            defaultModelExpandDepth: 10,
        },
    });
    logger.debug(`Swagger IS ENABLED! \x1b[4mhttp://localhost:${env}/${SWAGGER_ENDPOINT}\x1b[0m`);
}
bootstrap();
//# sourceMappingURL=main.js.map