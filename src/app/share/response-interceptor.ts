import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpService } from './http.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor( private httpService: HttpService ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          this.httpService.loading = false;
        }
      });
  }
}
