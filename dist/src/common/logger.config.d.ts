import { RequestMethod } from "@nestjs/common";
export declare const loggerConfig: {
    pinoHttp: {
        level: string;
        transport: {
            target: string;
            options: {
                colorize: boolean;
                ignore: string;
                singleLine: boolean;
            };
        };
        redact: string[];
        serializers: {
            req: typeof requestSerializer;
            res: typeof responseSerializer;
        };
        base: null;
        hooks: {
            logMethod: typeof formatLogMethod;
        };
    };
    exclude: {
        path: string;
        method: RequestMethod;
    }[];
};
declare function requestSerializer(req: Record<string, any>): {
    method: any;
    url: any;
    query: string;
    body: string;
};
declare function responseSerializer(res: Record<string, any>): {
    statusCode: any;
    body: string;
};
declare function formatLogMethod(args: Record<string, any>, method: Function): void;
export {};
