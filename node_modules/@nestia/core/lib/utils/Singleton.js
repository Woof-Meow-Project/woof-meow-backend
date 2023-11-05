"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
/**
 * @internal
 */
var Singleton = /** @class */ (function () {
    function Singleton(closure_) {
        this.closure_ = closure_;
        this.value_ = NOT_MOUNTED_YET;
    }
    Singleton.prototype.get = function () {
        if (this.value_ === NOT_MOUNTED_YET)
            this.value_ = this.closure_();
        return this.value_;
    };
    return Singleton;
}());
exports.Singleton = Singleton;
/**
 * @internal
 */
var NOT_MOUNTED_YET = {};
//# sourceMappingURL=Singleton.js.map