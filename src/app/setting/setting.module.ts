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
  MatTabsModule,
  MatCardModule,
  MatIconModule,
  MatSelectModule,
  MatDividerModule,
} from '@angular/material';

import { Setting }    from './setting';
import { Option }    from './option';
import { SettingDetail }  from './setting-detail';

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
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
  ],
  declarations: [
    Setting,
    Option,
    SettingDetail
  ],
  providers: [ SettingService ]
})
export class SettingModule {}
