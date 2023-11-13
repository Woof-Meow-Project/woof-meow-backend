import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

class GoogleSignupDto {

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  picture: string;
}
@Controller('users')
export class UsersController {
  constructor(
  ) {}

  @ApiOperation({ summary: '구글로 회원가입' })
  @Post('signup/google')
  public async signupGoogle(
    @Body() body: GoogleSignupDto,
  ) {
    try {
      return { success: true, message: '성공', data: {} };
    } catch (error) {
      // 에러 처리
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
