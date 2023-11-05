import { BaseEntity } from "./base.entity";
type EntityStatus = 'ACTIVE' | 'DELETED' | 'INACTIVE';
export declare abstract class DeletableEntity extends BaseEntity {
    entityStatus: EntityStatus;
    deletedAt: Date;
}
export {};
