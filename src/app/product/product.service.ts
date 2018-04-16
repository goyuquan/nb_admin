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

    // getProduct(id: number | string) {
    //     return ordersPromise
    //     // (+) before `id` turns the string into a number
    //     .then(orders => orders.find(order => order.id === +id));
    // }
}
