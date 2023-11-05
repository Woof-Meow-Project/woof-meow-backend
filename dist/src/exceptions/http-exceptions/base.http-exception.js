"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHttpException = void 0;
const common_1 = require("@nestjs/common");
class BaseHttpException extends common_1.HttpException {
    constructor({ response, status, sourceClass = '', sourceFunction = '', info = {} }) {
        super(response, status);
        this.info = {};
        this.sourceClass = sourceClass;
        this.sourceFunction = sourceFunction;
        this.info = info;
    }
    static throw({ message, status, sourceClass, sourceFunction, info }) {
        throw new BaseHttpException({ response: message, status, sourceClass, sourceFunction, info });
    }
}
exports.BaseHttpException = BaseHttpException;
//# sourceMappingURL=base.http-exception.js.map