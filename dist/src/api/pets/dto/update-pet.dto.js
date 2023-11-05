"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePetDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_pet_dto_1 = require("./create-pet.dto");
class UpdatePetDto extends (0, swagger_1.PartialType)(create_pet_dto_1.CreatePetDto) {
}
exports.UpdatePetDto = UpdatePetDto;
//# sourceMappingURL=update-pet.dto.js.map