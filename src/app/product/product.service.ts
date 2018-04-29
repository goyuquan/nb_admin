import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from './product.model';

let ordersPromise = Promise.resolve(ProductModel);

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
