import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { SettingService } from './setting.service';
import { SettingModel } from './setting.model';
import { ConfigService } from '../share/config.service';

@Component({
  selector: 'option',
  templateUrl: './option.html',
  styleUrls: ['./option.scss'],
})
export class Option {
  displayedColumns = ['id', 'phone', 'name', 'role', 'created_at', 'updated_at'];
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
      this.dataSource = new MatTableDataSource<Element>(data.setting.data);
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
