import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
} from '@angular/material';

import { MyTable }    from './mytable';

import { MyTableService } from './mytable.service';
import { MyTableRoutingModule } from './mytable-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyTableRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
  declarations: [
    MyTable,
  ],
  providers: [ MyTableService ]
})
export class MyTableModule {}
