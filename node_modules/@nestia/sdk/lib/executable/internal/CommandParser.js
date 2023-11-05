"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandParser = void 0;
var CommandParser;
(function (CommandParser) {
    function parse(argList) {
        const output = {};
        argList.forEach((arg, i) => {
            if (arg.startsWith("--") === false)
                return;
            const key = arg.slice(2);
            const value = argList[i + 1];
            if (value === undefined || value.startsWith("--"))
                return;
            output[key] = value;
        });
        return output;
    }
    CommandParser.parse = parse;
})(CommandParser || (exports.CommandParser = CommandParser = {}));
//# sourceMappingURL=CommandParser.js.map