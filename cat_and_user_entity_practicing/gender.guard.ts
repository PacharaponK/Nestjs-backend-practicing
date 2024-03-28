import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GenderGuard implements CanActivate {
    canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.rawHeaders);
    const header = request.rawHeaders.filter((i) => i == "Postman-Token")
    // if (header.length > 0) {
    //     return false;
    // } 
    return true;
    }
}
