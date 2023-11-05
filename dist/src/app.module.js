"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const app_controller_1 = require("./app.controller");
const config_1 = require("@nestjs/config");
const exceptions_1 = require("./exceptions");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const pino_logger_module_1 = require("./pino-logger/pino-logger.module");
const users_module_1 = require("./api/users/users.module");
const pets_module_1 = require("./api/pets/pets.module");
const database_service_1 = require("./database/database.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: exceptions_1.BaseExceptionFilter,
            }
        ],
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV || 'local'}`
            }),
            pino_logger_module_1.PinoLoggerModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule, pino_logger_module_1.PinoLoggerModule],
                useClass: database_service_1.DatabaseService,
            }),
            users_module_1.UsersModule,
            pets_module_1.PetsModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map