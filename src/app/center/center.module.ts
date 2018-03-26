import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
} from '@angular/material';


import { Center } from './center';
import { CenterList } from './center-list';
import { CenterDetail } from './center-detail';
import { CenterHome } from './center-home';

import { CenterService } from './center.service';
import { CenterRoutingModule } from './center-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CenterRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    Center,
    CenterList,
    CenterDetail,
    CenterHome
  ],
  providers: [ CenterService ]
})
export class CenterModule {}
