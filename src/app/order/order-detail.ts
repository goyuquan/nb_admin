import { Component, HostBinding, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { slideInDownAnimation } from '../animations';
import { MatTableDataSource } from '@angular/material';

import { OrderService } from './order.service';
import { ConfigService } from '../share/config.service';
import { OrderModel } from './order.model';

@Component({
    selector: 'order-detail',
    templateUrl: './order-detail.html',
    styleUrls: ['./order-detail.scss'],
    animations: [ slideInDownAnimation ]
})
export class OrderDetail {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    displayedColumns = [
        'name',
        'value'
    ];
    dataSource: MatTableDataSource<Element>;

    order: OrderModel;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: OrderService
    ) {}

    ngOnInit() {
        this.route.data
        .subscribe(data => {
            let order = [];
            for (let v in data.order.data) {
                let o = {};
                o['value'] = (data.order.data)[v];
                o['name'] = v;
                order.push(o);
            }
            console.log(order);
            this.dataSource = new MatTableDataSource<Element>(order);
        });
    }
}
