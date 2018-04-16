import { Component, HostBinding, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { slideInDownAnimation } from '../animations';
import { MatTableDataSource } from '@angular/material';

import { ProductService } from './product.service';
import { ConfigService } from '../share/config.service';
import { ProductModel } from './product.model';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.html',
    styleUrls: ['./product-detail.scss'],
    animations: [ slideInDownAnimation ]
})
export class ProductDetail {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    displayedColumns = [
        'name',
        'value'
    ];
    dataSource: MatTableDataSource<Element>;

    product = [];
    resolveData = [];
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProductService
    ) {}

    ngOnInit() {
        this.route.data
        .subscribe(data => {
            this.resolveData = data.product.data;
            for (let v in this.resolveData) {
                let o = {};
                o['value'] = (this.resolveData)[v];
                o['name'] = v;
                this.product.push(o);
            }

            this.dataSource = new MatTableDataSource<Element>(this.product);
        });
    }

    onEdit() {
        this.router.navigate([
            'product/edit/' + this.resolveData['id'],
            this.resolveData
        ]);
    }
}