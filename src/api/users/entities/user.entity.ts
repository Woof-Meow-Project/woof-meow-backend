import { DeletableEntity } from 'src/common/entities/deletable.entity';
import { Column, Entity, Unique } from 'typeorm';

export type LoginType = 'LOCAL' | 'GOOGLE' | 'FACEBOOK' | 'KAKAO';

@Entity('user')
@Unique(['socialId'])
export class User extends DeletableEntity {

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    loginType: LoginType;

    @Column({ type: 'varchar', nullable: true })
    nickname: string;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @Column({ type: 'varchar', nullable: false })
    socialId: string;

    @Column({ type: 'varchar', nullable: true })
    profileImage: string;
}
