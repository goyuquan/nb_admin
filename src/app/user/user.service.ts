import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';



@Injectable()
export class UserService {
  constructor( private http: HttpClient ) {}

  getUser(url): Observable<any> {
    return this.http.get( url )
  }

}
