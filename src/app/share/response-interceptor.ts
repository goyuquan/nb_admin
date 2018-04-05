import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
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
        .handle(req)
        .catch((error, caught) => {
            this.httpService.loading = false;
            this.authService.removeToken();
            this.authService.checkLoginStatus();
            this.router.navigate(['/login']); //重定向

            if (error.status === 401) { //未验证
                return Observable.throw(error);
            } else if (error.status === 403) { //权限不足
                return Observable.throw(error);
            } else if (error.status === 419) { //令牌过期
                return this.authService.updateToken().flatMap(
                    res => {
                        const authToken = this.authService.getToken();
                        const authReq = req.clone({ headers: req.headers.set('Authorization', authToken) });
                        return next.handle(authReq);
                    }
                );
            } else {
                return Observable.throw(error);
            }
        })
        .do(event => {
            if (event instanceof HttpResponse) {
                this.httpService.loading = false;
                //猎取响应头信息
                const token = event.headers.get('Authorization');
                this.authService.setToken(token);
                return next.handle(req).catch((error, caught) => {
                }) as any;
            }
        });
    }
}
