import { LoginType } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGoogleUserDto {

    @ApiProperty({
        example: 'test@test.com',
        description: 'email',
        required: true
    })
    email: string;

    @ApiProperty({
        example: 'test',
        description: 'password',
        required: true
    })
    password: string;

    @ApiProperty({
        example: 'test',
        description: 'name',
        required: true
    })
    name: string;

    @ApiProperty({
        example: 'test',
        description: 'loginType',
        required: true
    })
    loginType: LoginType;

    @ApiProperty({
        example: 'test',
        description: 'nickname',
        required: true
    })
    nickname: string;

    @ApiProperty({
        example: 'test',
        description: 'socialId',
        required: true
    })
    @IsNotEmpty()
    socialId: string;

    @ApiProperty({
        example: 'test',
        description: 'profileImage',
        required: true
    })
    @IsNotEmpty()
    profileImage: string;
}