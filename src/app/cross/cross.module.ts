import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSelectModule,
  MatDividerModule,
} from '@angular/material';

import { AddOption }    from './option/add';

import { CrossService } from './cross.service';
import { CrossRoutingModule } from './cross-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CrossRoutingModule,

    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: [
    AddOption,
  ],
  providers: [ CrossService ]
})
export class CrossModule {}
