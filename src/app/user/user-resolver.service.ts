
import {map} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { HttpService } from '../share/http.service';
import { UserModel } from './user.model';

@Injectable()
export class UserResolver implements Resolve<UserModel> {
  constructor(private httpService: HttpService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> {
    let id = route.paramMap.get('id');

    return this.httpService
      .get('/api/users/list').pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/table']);
          return null;
        }
      }));

  }
}
