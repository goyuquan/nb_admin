import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { HttpService } from '../share/http.service';
import { ProductModel } from './product.model';

@Injectable()
export class ProductListResolver implements Resolve<ProductModel> {
  constructor(private httpService: HttpService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductModel> {
    let id = route.paramMap.get('id');

    return this.httpService
      .get('/api/product/list')
      .map(productList => {
        if (productList) {
          return productList;
        } else {
          this.router.navigate(['/dashboard']);
          return null;
        }
      });

  }
}
