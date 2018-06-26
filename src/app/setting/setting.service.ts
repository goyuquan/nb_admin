import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';



@Injectable()
export class SettingService {
  constructor( private http: HttpClient ) {}

  getSetting(url): Observable<any> {
    return this.http.get( url )
  }

}
