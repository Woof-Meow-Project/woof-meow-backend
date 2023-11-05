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
exports.PinoLoggerService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const logger_config_1 = require("../common/logger.config");
let PinoLoggerService = class PinoLoggerService {
    constructor() {
        this.logger = new nestjs_pino_1.PinoLogger(logger_config_1.loggerConfig);
    }
    setContext(context) {
        this.logger.setContext(context);
    }
    log(message) {
        this.logger.info(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
    error(message, trace) {
        this.logger.error(message, trace);
    }
    warn(message) {
        this.logger.warn(message);
    }
};
exports.PinoLoggerService = PinoLoggerService;
exports.PinoLoggerService = PinoLoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PinoLoggerService);
//# sourceMappingURL=pino-logger.service.js.map