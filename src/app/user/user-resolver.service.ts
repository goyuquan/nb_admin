import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { UserModel, UserService } from './user.service';

@Injectable()
export class UserResolver implements Resolve<UserModel> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> {
    let id = route.paramMap.get('id');

    return this.userService
      .getUser('/api/users/list')
      .map(user => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/table']);
          return null;
        }
      });

  }
}
