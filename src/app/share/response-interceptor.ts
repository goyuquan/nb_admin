
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


import { HttpService } from './http.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

    constructor(
        private httpService: HttpService,
        private authService: AuthService,
        public router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
        .handle(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                this.httpService.loading = false;
                //猎取响应头信息
                const token = event.headers.get('Authorization');
                this.authService.setToken(token);
                return next.handle(req) as any;
            }
        }));
    }
}
