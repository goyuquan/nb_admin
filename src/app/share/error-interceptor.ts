import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HttpService } from './http.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private httpService: HttpService,
        private authService: AuthService,
        public router: Router,
        public snackBar: MatSnackBar
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
        .handle(req)
        .catch((error, caught) => {
            this.httpService.loading = false;

            switch(error.status)
            {
                case 401: //未验证
                {
                    this.authService.removeToken();
                    this.authService.checkLoginStatus();
                    this.router.navigate(['/login']); //重定向
                    this.snackBar.open( error.error.message, 'close', { duration: 5000 });
                    return [];
                }
                case 403: //权限不足
                {
                    this.snackBar.open( error.error.message, 'close', { duration: 5000 });
                    return [];
                }
                case 419: //令牌过期
                {
                    return this.authService.updateToken().flatMap(
                        res => {
                            const authToken = this.authService.getToken();
                            const authReq = req.clone({ headers: req.headers.set('Authorization', authToken) });
                            return next.handle(authReq);
                        }
                    );
                }
                case 422: //表单验证失败
                {
                    this.snackBar.open( error.error.message, 'close', { duration: 5000 });
                    return [];
                }
                default:
                    return Observable.throw(error);
            }
        });
    }
}
