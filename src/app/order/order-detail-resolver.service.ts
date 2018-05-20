
import {map} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { HttpService } from '../share/http.service';
import { OrderModel } from './order.model';

@Injectable()
export class OrderDetailResolver implements Resolve<OrderModel> {
    constructor(private httpService: HttpService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderModel> {
        let id = route.paramMap.get('id');

        return this.httpService
        .get('/api/order/' + id).pipe(
        map(orderList => {
            if (orderList) {
                return orderList;
            } else {
                this.router.navigate(['/order']);
                return null;
            }
        }));
    }
}
