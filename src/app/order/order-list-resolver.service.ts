import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { HttpService } from '../share/http.service';
import { OrderModel } from './order.model';

@Injectable()
export class OrderListResolver implements Resolve<OrderModel> {
  constructor(private httpService: HttpService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel> {
    let id = route.paramMap.get('id');

    return this.httpService
      .get('/api/order/list')
      .map(orderList => {
        if (orderList) {
          return orderList;
        } else {
          this.router.navigate(['/dashboard']);
          return null;
        }
      });

  }
}
