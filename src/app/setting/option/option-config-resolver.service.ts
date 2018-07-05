import {map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { HttpService } from '../../share/http.service';

@Injectable()
export class OptionConfigResolver implements Resolve<any> {
  constructor(private httpService: HttpService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.paramMap['params'].id;

    return this.httpService
      .get('/api/setting/option/config/' + id).pipe(
      map(option => {
        if (option) {
          return option;
        } else {
          this.router.navigate(['/table']);
          return null;
        }
      }));

  }
}
