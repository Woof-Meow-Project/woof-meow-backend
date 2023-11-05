"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathUtil = void 0;
var PathUtil;
(function (PathUtil) {
    PathUtil.accessors = (path) => path
        .split("/")
        .filter((str) => str.length && str[0] !== ":")
        .map(normalize);
    const normalize = (str) => str.split("-").join("_").split(".").join("_");
})(PathUtil || (exports.PathUtil = PathUtil = {}));
//# sourceMappingURL=PathUtil.js.map