import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export class OrderModel {
  constructor( public id: number, public name: string ) {}
}

let ORDERS = [
  new OrderModel(11, 'Mr. Nice'),
  new OrderModel(12, 'Narco'),
  new OrderModel(13, 'Bombasto'),
  new OrderModel(14, 'Celeritas'),
  new OrderModel(15, 'Magneta'),
  new OrderModel(16, 'RubberMan')
];

let ordersPromise = Promise.resolve(ORDERS);

@Injectable()
export class OrderService {

    constructor( private http: HttpClient ) {}

  getOrderList(url): Observable<any> {
    return this.http.get( url )
  }

  getOrder(id: number | string) {
    return ordersPromise
      // (+) before `id` turns the string into a number
      .then(orders => orders.find(order => order.id === +id));
  }
}
