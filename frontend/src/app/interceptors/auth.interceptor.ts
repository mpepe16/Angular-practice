
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthFacade } from '../domains/user-management/data/application/auth.facade'; 
import { take, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authFacade: AuthFacade) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authFacade.accessToken$.pipe( // Assuming accessToken$ exists in AuthFacade
      take(1), // Only take the latest token value
      switchMap(token => {
        if (token) {
          const clonedRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`)
          });
          return next.handle(clonedRequest);
        }
        return next.handle(request);
      })
    );
  }
}