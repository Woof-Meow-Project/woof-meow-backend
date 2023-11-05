import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
export declare class PetsService {
    create(createPetDto: CreatePetDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePetDto: UpdatePetDto): string;
    remove(id: number): string;
}
