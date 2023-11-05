import { BaseEntity } from "typeorm";
export declare abstract class TrackedEntity extends BaseEntity {
    createdAt: Date;
    updatedAt: Date;
}
