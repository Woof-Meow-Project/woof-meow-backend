import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
export declare class PetsController {
    private readonly petsService;
    constructor(petsService: PetsService);
    create(createPetDto: CreatePetDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePetDto: UpdatePetDto): string;
    remove(id: string): string;
}
