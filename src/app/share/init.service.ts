import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InitService {

    constructor( private http: HttpClient ) {}

    getAllOptions(): Observable<any> {
      return this.http.get('/api/init/options');
    }

}
