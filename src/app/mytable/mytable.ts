import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { MyTableModel, MyTableService } from './mytable.service';

@Component({
  selector: 'mytable',
  templateUrl: './mytable.html',
  styleUrls: ['./mytable.scss'],
})
export class MyTable {
  displayedColumns = ['id', 'name', 'email', 'created_at'];
  dataSource: MatTableDataSource<Element>;
  users: any;
  editName: string = '';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data
    .subscribe(data => {
      this.dataSource = new MatTableDataSource<Element>(data.mytable.data);
      console.log('res is ____________', data)
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
