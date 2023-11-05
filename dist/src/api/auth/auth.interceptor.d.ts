import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class AuthInterceptor implements NestInterceptor {
    constructor();
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any>;
}
