
import {switchMap} from 'rxjs/operators';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { slideInDownAnimation } from '../animations';

import { DashboardModel, DashboardService } from './dashboard.service';

@Component({
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    animations: [ slideInDownAnimation ],
})
export class Dashboard {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    dashboards$: Observable<DashboardModel[]>;

    private selectedId: number;
    results: string[];

    constructor(
        private service: DashboardService,
        public route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.dashboards$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => {
            this.selectedId = +params.get('id');
            return this.service.getDashboardes();
        }));
    }

    isSelected(dashboard: DashboardModel) { return dashboard.id === this.selectedId; }
}
