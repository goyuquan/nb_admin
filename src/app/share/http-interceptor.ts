import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthService } from '../auth/auth.service';
import { HttpService } from './http.service';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.httpService.loading = true; //显示loading
    const authToken = this.authService.getToken();
    const authReq = authToken ? req.clone({setHeaders: {Authorization: authToken}}) : req;
    return next.handle(authReq);
  }
}
