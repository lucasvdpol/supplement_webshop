import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {LoginService} from '../services/login.service';
import {inject} from '@angular/core';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn){
  const loginService = inject(LoginService);
  const authToken = loginService.getAuthtoken();

  if (authToken != null && !loginService.isTokenExpired() && loginService.isValidUser()) {
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    })
    return next(newRequest);
  }
  loginService.logout();
  return next(req);
}
