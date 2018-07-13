import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingService {
  constructor( private http: HttpClient ) {}

  getSetting(url): Observable<any> {
    return this.http.get( url )
  }

  optionCreate(url, param): Observable<any> {
    return this.http.post(url, param);
  }

  optionDelete(url): Observable<any> {
    return this.http.delete(url);
  }

  optionUpdate(url, param): Observable<any> {
    return this.http.put(url, param);
  }

  optionGet(id): Observable<any> {
    return this.http.get('/api/setting/option/item/' + id);
  }

}
