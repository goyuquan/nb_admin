import { Component, HostBinding, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { slideInDownAnimation } from '../animations';
import { MatTableDataSource } from '@angular/material';

import { SettingService } from './setting.service';
import { ConfigService } from '../share/config.service';
import { SettingModel } from './setting.model';

@Component({
    selector: 'setting-detail',
    templateUrl: './setting-detail.html',
    styleUrls: ['./setting-detail.scss'],
    animations: [ slideInDownAnimation ]
})
export class SettingDetail {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    displayedColumns = [
        'name',
        'value'
    ];
    dataSource: MatTableDataSource<Element>;

    setting: SettingModel;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: SettingService
    ) {}

    ngOnInit() {
        // this.route.data
        // .subscribe(data => {
        //     let setting = [];
        //     for (let v in data.setting.data) {
        //         let o = {};
        //         o['value'] = (data.setting.data)[v];
        //         o['name'] = v;
        //         setting.push(o);
        //     }
        //     console.log(setting);
        //     this.dataSource = new MatTableDataSource<Element>(setting);
        // });
    }
}
