"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const core_1 = require("@nestia/core");
const user_const_1 = require("./user.const");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signupEmail(input) {
        await this.usersService.signupEmail(input);
    }
};
exports.UsersController = UsersController;
__decorate([
    core_1.TypedRoute.Post('email', { type: "assert", assert: input => { const assert = input => {
            const __is = input => {
                return null !== input && undefined === input;
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedRoute.Post.guard;
                    return (null !== input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    })) && (undefined === input || $guard(true, {
                        path: _path + "",
                        expected: "undefined",
                        value: input
                    }));
                })(input, "$input", true);
            return input;
        }; const stringify = input => {
            return undefined;
        }; return stringify(assert(input)); } }),
    __param(0, (0, core_1.TypedBody)({ type: "assert", assert: input => {
            const __is = input => {
                return "object" === typeof input && null !== input && ("string" === typeof input.email && /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input.email) && "string" === typeof input.password && "string" === typeof input.name);
            };
            if (false === __is(input))
                ((input, _path, _exceptionable = true) => {
                    const $guard = core_1.TypedBody.guard;
                    const $ao0 = (input, _path, _exceptionable = true) => ("string" === typeof input.email && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(input.email) || $guard(_exceptionable, {
                        path: _path + ".email",
                        expected: "string & Format<\"email\">",
                        value: input.email
                    })) || $guard(_exceptionable, {
                        path: _path + ".email",
                        expected: "(string & Format<\"email\">)",
                        value: input.email
                    })) && ("string" === typeof input.password || $guard(_exceptionable, {
                        path: _path + ".password",
                        expected: "string",
                        value: input.password
                    })) && ("string" === typeof input.name || $guard(_exceptionable, {
                        path: _path + ".name",
                        expected: "string",
                        value: input.name
                    }));
                    return ("object" === typeof input && null !== input || $guard(true, {
                        path: _path + "",
                        expected: "CreateUserDto",
                        value: input
                    })) && $ao0(input, _path + "", true) || $guard(true, {
                        path: _path + "",
                        expected: "CreateUserDto",
                        value: input
                    });
                })(input, "$input", true);
            return input;
        } })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signupEmail", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(user_const_1.ControllerSignupRoutePath),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map