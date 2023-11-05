"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsService = void 0;
const common_1 = require("@nestjs/common");
let PetsService = class PetsService {
    create(createPetDto) {
        return 'This action adds a new pet';
    }
    findAll() {
        return `This action returns all pets`;
    }
    findOne(id) {
        return `This action returns a #${id} pet`;
    }
    update(id, updatePetDto) {
        return `This action updates a #${id} pet`;
    }
    remove(id) {
        return `This action removes a #${id} pet`;
    }
};
exports.PetsService = PetsService;
exports.PetsService = PetsService = __decorate([
    (0, common_1.Injectable)()
], PetsService);
//# sourceMappingURL=pets.service.js.map