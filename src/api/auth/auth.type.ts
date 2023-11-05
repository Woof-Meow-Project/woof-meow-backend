import { IsIn, IsPositive } from 'class-validator'

export const UserTypes = [
  'user',
  'admin',
] as const
export type TUserType = (typeof UserTypes)[number]

export class TJwtPayload {
  @IsPositive()
  userId: number

  @IsIn(UserTypes)
  userType: TUserType
}

export type TApiRole = TUserType[] | 'public'
