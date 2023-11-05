import { Body, Injectable, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async signupEmail(
    createUserDto: CreateUserDto
  ): Promise<number>{
    const user = this.usersRepository.create(createUserDto);
    user.emailVerified = true;
    user.entityStatus = 'ACTIVE';
    user.loginType = 'LOCAL';
    user.socialId = user.email;
    await this.usersRepository.save(user);
    return user.id;
  }

}
