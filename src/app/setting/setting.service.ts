import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingService {
  constructor( private http: HttpClient ) {}

  optionConfig(url): Observable<any> {
    return this.http.get('/api/setting/option/config/' + url)
  }

  optionCreate(param): Observable<any> {
    return this.http.post('/api/setting/option/item', param);
  }

  optionDelete(url): Observable<any> {
    return this.http.delete('/api/setting/option/item/' + url);
  }

  optionUpdate(url, param): Observable<any> {
    return this.http.put('/api/setting/option/item/' + url, param);
  }

  optionGet(id): Observable<any> {
    return this.http.get('/api/setting/option/item/' + id);
  }

}
