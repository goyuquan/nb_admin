import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { OrderService } from './order.service';
import { OrderModel } from './order.model';

@Injectable()
export class OrderListResolver implements Resolve<OrderModel> {
  constructor(private orderService: OrderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel> {
    let id = route.paramMap.get('id');

    return this.orderService
      .getOrderList('/api/orderLists/list')
      .map(orderList => {
        if (orderList) {
          return orderList;
        } else {
          this.router.navigate(['/table']);
          return null;
        }
      });

  }
}
