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
    const Authorization = this.authService.getToken();
    const authReq = Authorization ? req.clone({setHeaders: {'Authorization': Authorization}}) : req;

    return next.handle(req).catch((error, caught) => {
      if (error.status === 401) { //未验证
        this.authService.removeToken();
        // this.router.navigate(['/auth/signin]); // TODO remember to import router class and declare it in the class
        return Observable.throw(error);
      } else if (error.status === 403) { //权限不足
        return Observable.throw(error);
      } else if (error.status === 419) { //令牌过期
        return this.authService.updateToken().flatMap(
          res => {
            const authReq = req.clone({ headers: req.headers.set('Authorization', res) });
            return next.handle(authReq);
          }
        );
      } else {
        return Observable.throw(error);
      }
    }) as any;
  }
}
