
import {map} from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { HttpService } from '../share/http.service';
import { SettingModel } from './setting.model';

@Injectable()
export class SettingDetailResolver implements Resolve<SettingModel> {
    constructor(private httpService: HttpService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SettingModel> {
        let id = route.paramMap.get('id');

        return this.httpService
        .get('/api/order/' + id).pipe(
        map(settingList => {
            if (settingList) {
                return settingList;
            } else {
                this.router.navigate(['/setting']);
                return null;
            }
        }));
    }
}
