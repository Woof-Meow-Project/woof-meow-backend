export declare class BaseResponse<T> {
    statusCode: number;
    data: T;
    message?: string;
    constructor(statusCode: number, data: T, message?: string);
}
