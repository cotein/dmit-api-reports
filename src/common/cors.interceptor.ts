import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    response.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    response.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    response.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    //response.header('Access-Control-Allow-Credentials', 'true');

    return next.handle();
  }
}
