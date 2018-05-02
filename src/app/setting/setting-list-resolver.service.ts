import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { HttpService } from '../share/http.service';
import { SettingModel } from './setting.model';

@Injectable()
export class SettingListResolver implements Resolve<SettingModel> {
  constructor(private httpService: HttpService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SettingModel> {
    let id = route.paramMap.get('id');

    return this.httpService
      .get('/api/order/list')
      .map(settingList => {
        if (settingList) {
          return settingList;
        } else {
          this.router.navigate(['/dashboard']);
          return null;
        }
      });

  }
}
