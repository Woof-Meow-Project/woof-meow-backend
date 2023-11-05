import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { TypedBody, TypedRoute } from "@nestia/core";
import { ControllerSignupRoutePath } from './user.const';

@Controller(ControllerSignupRoutePath)
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {
  }

  @TypedRoute.Post('email')
  async signupEmail(
    @TypedBody() input: CreateUserDto,
  ) {
    // 유저 생성
    await this.usersService.signupEmail(input);

    // jwt 생성 및 쿠키에 저장
  }
}
