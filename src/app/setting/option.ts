import { Component, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { ConfigService } from '../share/config.service';
import { SettingModel } from './setting.model';

@Component({
    selector: 'option',
    templateUrl: './option.html',
    styleUrls: ['./option.scss'],
})
export class Option {
    displayedColumns = [
        'name',
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
            console.log('data is ', data)
            this.dataSource = new MatTableDataSource<Element>(data.options.data);
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
