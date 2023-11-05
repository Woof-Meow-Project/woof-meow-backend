/**
 * 공통 응답 객체
 * @date 2023. 9. 27. - 오후 5:27:57
 *
 * @export
 * @class BaseResponse
 * @typedef {BaseResponse}
 * @template T
 */
export class BaseResponse<T> {
    statusCode: number;
    data: T;
    message?: string;

    constructor(statusCode: number, data: T, message?: string) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}
