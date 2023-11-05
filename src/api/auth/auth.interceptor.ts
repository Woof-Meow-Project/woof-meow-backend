import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'

// 새로운 jwt가 발급됐다면 cookie로 전달해줌
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
  ) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
      }),
    )
  }
}
