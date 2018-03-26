import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class DashboardModel {
  constructor( public id: number, public name: string ) {}
}

let DASHBOARD = [
  new DashboardModel(11, 'Mr. Nice'),
  new DashboardModel(12, 'Narco'),
  new DashboardModel(13, 'Bombasto'),
  new DashboardModel(14, 'Celeritas'),
  new DashboardModel(15, 'Magneta'),
  new DashboardModel(16, 'RubberMan')
];

let dashboardPromise = Promise.resolve(DASHBOARD);

@Injectable()
export class DashboardService {
  getDashboardes() { return dashboardPromise; }

  getDashboard(id: number | string) {
    return dashboardPromise
      // (+) before `id` turns the string into a number
      .then(res => res.find(dashboard => dashboard.id === +id));
  }
}
