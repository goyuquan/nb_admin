import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { MatTableDataSource } from '@angular/material';

import { ProductService } from './product.service';
import { ConfigService } from '../share/config.service';
import { ProductModel } from './product.model';

@Component({
    templateUrl: './product-edit.html',
    styleUrls: ['./product-edit.scss'],
})
export class ProductEdit {
    displayedColumns = [
        'name',
        'value'
    ];
    dataSource: MatTableDataSource<Element>;
    selectedId: number;
    product;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductService
    ) {}

    ngOnInit() {
        console.log(this.route.snapshot.paramMap['params'])
    }

}
