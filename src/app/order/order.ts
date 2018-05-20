import { Component, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { ConfigService } from '../share/config.service';
import { OrderModel } from './order.model';

@Component({
    selector: 'order',
    templateUrl: './order.html',
    styleUrls: ['./order.scss'],
})
export class Order {
    displayedColumns = [
        'id',
        'user_id',
        'contact_id',
        'status',
        'period',
        'delivery_time',
        'created_at',
        'updated_at',
        'detail',
    ];
    dataSource: MatTableDataSource<Element>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        public config: ConfigService,
        private router: Router
    ) {}

    ngOnInit() {

        this.route.data
        .subscribe(data => {
            this.dataSource = new MatTableDataSource<Element>(data.orders.data);
        });
    }


    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

}
