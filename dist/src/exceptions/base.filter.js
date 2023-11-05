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
exports.BaseExceptionFilter = exports.UNKNOWN_MESSAGE = void 0;
const common_1 = require("@nestjs/common");
const pino_logger_service_1 = require("../pino-logger/pino-logger.service");
exports.UNKNOWN_MESSAGE = 'unknown';
let BaseExceptionFilter = class BaseExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus() || 500;
        const errorResponse = exception.getResponse();
        let errorMessage = "";
        if (typeof errorResponse === 'string') {
            errorMessage = errorResponse;
        }
        else if (typeof errorResponse === 'object' && errorResponse !== null) {
            errorMessage = JSON.stringify(errorResponse);
        }
        else {
            errorMessage = exports.UNKNOWN_MESSAGE;
        }
        let stackInfoArray = Array();
        let stackInfo = "";
        let sourceClass = "";
        let sourceFunction = "";
        if (exception.stack) {
            stackInfoArray = this.extractClassesAndFunctions(exception.stack);
            stackInfo = `\n Stack Info: `
                + stackInfoArray.map((item) => `${item.class}.${item.function}\n`).join(' -> ');
        }
        if (exception.sourceClass && exception.sourceFunction) {
            sourceClass = exception.sourceClass;
            sourceFunction = exception.sourceFunction;
        }
        else if (exception.sourceClass) {
            const stackInfoFunction = stackInfoArray.find((item) => item.class === exception.sourceClass);
            if (stackInfoFunction) {
                sourceClass = stackInfoFunction.class;
                sourceFunction = stackInfoFunction.function;
            }
            else {
                sourceClass = exception.sourceClass;
                sourceFunction = exports.UNKNOWN_MESSAGE;
            }
        }
        else {
            const stackInfoFunction = stackInfoArray[1];
            if (stackInfoFunction) {
                sourceClass = stackInfoFunction.class;
                sourceFunction = stackInfoFunction.function;
            }
            else {
                sourceClass = exports.UNKNOWN_MESSAGE;
                sourceFunction = exports.UNKNOWN_MESSAGE;
            }
        }
        this.logger.setContext(`${sourceClass} ${sourceFunction}`);
        let errorMessageWithInfo = errorMessage;
        if (exception.info) {
            errorMessageWithInfo += `\n${JSON.stringify(exception.info)}`;
        }
        this.logger.error(`${errorMessageWithInfo}${stackInfo}`, exception.stack);
        response.status(status).send({
            statusCode: status,
            error: errorMessage,
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
            info: exception.info
        });
    }
    extractClassesAndFunctions(stack) {
        const stackLines = stack.split('\n');
        const regex = /at (\w+\.?\w+) \(/;
        const result = Array();
        for (let line of stackLines) {
            const match = regex.exec(line);
            if (match && match[1]) {
                const parts = match[1].split('.');
                let className = "";
                let functionName = "";
                if (parts.length > 1) {
                    className = parts[0];
                    functionName = parts[1];
                }
                else {
                    functionName = parts[0];
                }
                result.push({ class: className, function: functionName });
            }
        }
        return result;
    }
};
exports.BaseExceptionFilter = BaseExceptionFilter;
exports.BaseExceptionFilter = BaseExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [pino_logger_service_1.PinoLoggerService])
], BaseExceptionFilter);
//# sourceMappingURL=base.filter.js.map