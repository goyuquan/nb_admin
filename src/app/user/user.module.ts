import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
} from '@angular/material';

import { User }    from './user';

import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
  declarations: [
    User,
  ],
  providers: [ UserService ]
})
export class UserModule {}
