import { DeletableEntity } from 'src/common/entities/deletable.entity';
type LoginType = 'LOCAL' | 'GOOGLE' | 'FACEBOOK' | 'KAKAO';
export declare class User extends DeletableEntity {
    name: string;
    email: string;
    emailVerified: boolean;
    loginType: LoginType;
    nickname: string;
    passWord: string;
    socialId: string;
    profileImage: string;
}
export {};
