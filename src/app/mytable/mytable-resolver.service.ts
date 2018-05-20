
import {map} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { MyTableModel, MyTableService } from './mytable.service';

@Injectable()
export class MyTableResolver implements Resolve<MyTableModel> {
  constructor(private mytableservice: MyTableService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MyTableModel> {
    let id = route.paramMap.get('id');

    return this.mytableservice
      .getMyTable('/api/users/list').pipe(
      map(mytable => {
        if (mytable) {
          return mytable;
        } else {
          this.router.navigate(['/table']);
          return null;
        }
      }));

  }
}
