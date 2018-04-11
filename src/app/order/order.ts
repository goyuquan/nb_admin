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
    dataSource: MatTableDataSource<Element>;

    orders$: Observable<OrderModel[]>;

    private selectedId: number;
    results: string[];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private service: OrderService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {

        this.route.data
        .subscribe(data => {
            this.dataSource = new MatTableDataSource<Element>(data.orders.data);
            console.log('orders is ____________', this.dataSource)
        });

        // this.orders$ = this.route.paramMap
        //   .switchMap((params: ParamMap) => {
        //     // (+) before `params.get()` turns the string into a number
        //     this.selectedId = +params.get('id');
        //     return this.service.getOrderList();
        //   });
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

    // isSelected(order: OrderModel) { return order.id === this.selectedId; }
}
