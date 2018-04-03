import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
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
      .do(event => {
        if (event instanceof HttpResponse) {

            this.httpService.loading = false;

            console.log('____________________===', req);

            return next.handle(req).catch((error, caught) => {
                this.authService.removeToken();
                this.authService.checkLoginStatus();
                this.router.navigate(['/login']); //退出成功后重定向

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
            }) as any;

        }
      });
  }
}
