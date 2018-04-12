import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { OrderService } from './order.service';
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
        'updated_at'
    ];
    dataSource: MatTableDataSource<Element>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        // private service: OrderService,
        private route: ActivatedRoute,
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
