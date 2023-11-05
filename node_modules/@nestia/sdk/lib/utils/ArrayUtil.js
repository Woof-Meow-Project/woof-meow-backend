"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtil = void 0;
var ArrayUtil;
(function (ArrayUtil) {
    function has(array, ...items) {
        return items.every((elem) => array.find((org) => org === elem) !== undefined);
    }
    ArrayUtil.has = has;
    function asyncMap(array, closure) {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = [];
            for (const elem of array)
                ret.push(yield closure(elem));
            return ret;
        });
    }
    ArrayUtil.asyncMap = asyncMap;
    function asyncFilter(array, closure) {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = [];
            for (const elem of array)
                if ((yield closure(elem)) === true)
                    ret.push(elem);
            return ret;
        });
    }
    ArrayUtil.asyncFilter = asyncFilter;
})(ArrayUtil || (exports.ArrayUtil = ArrayUtil = {}));
//# sourceMappingURL=ArrayUtil.js.map