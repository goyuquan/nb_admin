
import {map, take} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Center, CenterService } from './center.service';

@Injectable()
export class CenterDetailResolver implements Resolve<Center> {
  constructor(private cs: CenterService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Center> {
    let id = route.paramMap.get('id');

    return this.cs.getCenter(id).pipe(take(1),map(center => {
      if (center) {
        return center;
      } else { // id not found
        this.router.navigate(['/center']);
        return null;
      }
    }),);
  }
}
