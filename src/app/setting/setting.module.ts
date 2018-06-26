import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
} from '@angular/material';

import { Setting }    from './setting';
import { Option }    from './option';

import { SettingService } from './setting.service';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
  declarations: [
    Setting,
    Option,
  ],
  providers: [ SettingService ]
})
export class SettingModule {}
