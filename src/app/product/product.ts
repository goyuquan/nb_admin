import { Component, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { ConfigService } from '../share/config.service';
import { ProductModel } from './product.model';

@Component({
    selector: 'product',
    templateUrl: './product.html',
    styleUrls: ['./product.scss'],
})
export class Product {
    displayedColumns = [
        'id',
        'status',
        'name',
        'price',
        'unit',
        'origin',
        'created_at',
        'updated_at',
        'detail'
    ];
    dataSource: MatTableDataSource<Element>;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        private config: ConfigService,
        private router: Router
    ) {}

    ngOnInit() {

        this.route.data
        .subscribe(data => {
            this.dataSource = new MatTableDataSource<Element>(data.products.data);
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
