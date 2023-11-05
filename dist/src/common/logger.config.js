"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = void 0;
const common_1 = require("@nestjs/common");
const { NODE_ENV = 'local' } = process.env;
exports.loggerConfig = {
    pinoHttp: {
        level: NODE_ENV === 'local' ? 'debug' : 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
                singleLine: true,
            }
        },
        redact: ['req.headers.authorization'],
        serializers: {
            req: requestSerializer,
            res: responseSerializer,
        },
        base: null,
        hooks: {
            logMethod: formatLogMethod
        }
    },
    exclude: [
        { path: '/api-docs/(.*)', method: common_1.RequestMethod.ALL },
        { path: '/api-docs', method: common_1.RequestMethod.ALL },
        { path: 'api/version', method: common_1.RequestMethod.ALL },
    ],
};
function requestSerializer(req) {
    return {
        method: req.method,
        url: req.url,
        query: JSON.stringify(req.query, null, 4),
        body: JSON.stringify(req.body, null, 4)
    };
}
function responseSerializer(res) {
    return {
        statusCode: res.statusCode,
        body: JSON.stringify(res.body, null, 4)
    };
}
function formatLogMethod(args, method) {
    const originalMessage = args[1] || '';
    let contextOrMethodUrl = '';
    let requestInfo = args.request ? `\nRequest: ${JSON.stringify(args.request)}` : '';
    let formattedMessage = originalMessage + requestInfo + '\n';
    if (!isError(args)) {
        if (hasContext(args)) {
            contextOrMethodUrl = `[ ${args[0].context} ]`;
            formattedMessage = `${contextOrMethodUrl} - ${originalMessage}` + requestInfo;
        }
        const newArgs = [formattedMessage];
        method.apply(this, newArgs);
    }
}
function isError(args) {
    return args[0].res && args[0].res.statusCode >= 400;
}
function hasContext(args) {
    return args[0].context;
}
//# sourceMappingURL=logger.config.js.map