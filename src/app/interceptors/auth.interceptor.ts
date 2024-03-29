import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.isLoggedIn()) {
      const token = this.authService.getToken();
      const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + token),
      });
      return next.handle(newReq);
    }else{
      return next.handle(req);
    }

  }
}

