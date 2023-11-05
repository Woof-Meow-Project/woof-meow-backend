import {
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

export abstract class TrackedEntity extends BaseEntity {
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}