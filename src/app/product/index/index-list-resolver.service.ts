
import {map} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { HttpService } from '../../share/http.service';

@Injectable()
export class ProductListResolver implements Resolve<any> {
  constructor(private httpService: HttpService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.paramMap.get('id');

    return this.httpService
      .get('/api/product/list').pipe(
      map(productList => {
        if (productList) {
          return productList;
        } else {
          this.router.navigate(['/dashboard']);
          return null;
        }
      }));

  }
}
