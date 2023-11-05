import { RequestMethod } from "@nestjs/common";

const { NODE_ENV = 'local' } = process.env;

export const loggerConfig = {
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
        { path: '/api-docs/(.*)', method: RequestMethod.ALL },
        { path: '/api-docs', method: RequestMethod.ALL },
        { path: 'api/version', method: RequestMethod.ALL },
    ],
}

function requestSerializer(req: Record<string, any>) {
    return {
        method: req.method,
        url: req.url,
        query: JSON.stringify(req.query, null, 4),
        body: JSON.stringify(req.body, null, 4)
    };
}

function responseSerializer(res: Record<string, any>) {
    return {
        statusCode: res.statusCode,
        body: JSON.stringify(res.body, null, 4)    // Adds indentation for better readability
    };
}


function formatLogMethod(args: Record<string, any>, method: Function) { // TODO: response body 출력
    const originalMessage = args[1] || '';
    let contextOrMethodUrl = '';
    let requestInfo = args.request ? `\nRequest: ${JSON.stringify(args.request)}` : ''; // 추가한 요청 정보 출력
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


function isError(args: Record<string, any>): boolean {
    return args[0].res && args[0].res.statusCode >= 400;
}

function hasContext(args: Record<string, any>): boolean {
    return args[0].context;
}