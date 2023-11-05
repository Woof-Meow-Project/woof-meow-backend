"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapUtil = void 0;
var MapUtil;
(function (MapUtil) {
    function take(dict, key, generator) {
        const oldbie = dict.get(key);
        if (oldbie)
            return oldbie;
        const value = generator();
        dict.set(key, value);
        return value;
    }
    MapUtil.take = take;
})(MapUtil || (exports.MapUtil = MapUtil = {}));
//# sourceMappingURL=MapUtil.js.map