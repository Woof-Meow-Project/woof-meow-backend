import { Module } from '@nestjs/common'
import { AuthInterceptor } from './auth.interceptor'
import { AuthService } from './auth.service'

@Module({
  providers: [AuthService, AuthInterceptor],
  exports: [AuthService, AuthInterceptor],
})
export class AuthModule {}
