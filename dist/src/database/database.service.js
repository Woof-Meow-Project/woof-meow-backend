"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pino_logger_service_1 = require("../pino-logger/pino-logger.service");
let DatabaseService = class DatabaseService {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        this.logger.setContext(this.constructor.name);
    }
    getConnectionOptions() {
        const isLocal = this.configService.get('NODE_ENV') === 'local';
        this.logger.debug(`getConnectionOptions() : ${isLocal ? 'local' : 'production'}`);
        if (isLocal) {
            return {
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '1234',
                database: 'WoofMeow',
                synchronize: true,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                logging: true,
            };
        }
        return {
            type: 'mysql',
            host: this.configService.get('DATABASE_HOST'),
            port: this.configService.get('DATABASE_PORT'),
            username: this.configService.get('DATABASE_USER'),
            password: this.configService.get('DATABASE_PASSWORD'),
            database: this.configService.get('DATABASE_NAME'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        };
    }
    async createTypeOrmOptions() {
        this.logger.debug('createTypeOrmOptions()');
        return this.getConnectionOptions();
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        pino_logger_service_1.PinoLoggerService])
], DatabaseService);
//# sourceMappingURL=database.service.js.map