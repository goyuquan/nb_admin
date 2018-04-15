import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { UserService } from './user.service';
import { UserModel } from './user.model';
import { ConfigService } from '../share/config.service';

@Component({
  selector: 'user',
  templateUrl: './user.html',
  styleUrls: ['./user.scss'],
})
export class User {
  displayedColumns = ['id', 'phone', 'name', 'role', 'created_at', 'updated_at'];
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
      this.dataSource = new MatTableDataSource<Element>(data.user.data);
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
