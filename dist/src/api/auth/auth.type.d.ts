export declare const UserTypes: readonly ["user", "admin"];
export type TUserType = (typeof UserTypes)[number];
export declare class TJwtPayload {
    userId: number;
    userType: TUserType;
}
export type TApiRole = TUserType[] | 'public';
