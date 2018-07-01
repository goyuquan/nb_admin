import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { SettingService } from '../setting.service';
import { ConfigService } from '../../share/config.service';

@Component({
  templateUrl: './option-config.html',
  styleUrls: ['./option-config.scss'],
})
export class OptionConfig {
  displayedColumns = ['name'];
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
