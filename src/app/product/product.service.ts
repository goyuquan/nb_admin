import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

    constructor( private http: HttpClient ) {}

    get(url, param): Observable<any> {
      return this.http.get( url, { params: param });
    }

    postProduct(url, param): Observable<any> {
      return this.http.post( url, param);
    }
}
