import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor( private http: HttpClient ) {}

  getUser(url): Observable<any> {
    return this.http.get( url )
  }

}
