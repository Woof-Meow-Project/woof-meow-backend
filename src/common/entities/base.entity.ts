import { PrimaryGeneratedColumn } from 'typeorm';

// @Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
