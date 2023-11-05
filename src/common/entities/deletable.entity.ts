import {  Column } from "typeorm";
import { BaseEntity } from "./base.entity";

type EntityStatus = 'ACTIVE' | 'DELETED' | 'INACTIVE';

export abstract class DeletableEntity extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    entityStatus: EntityStatus;


    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}