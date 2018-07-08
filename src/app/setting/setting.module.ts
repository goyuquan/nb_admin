import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatButtonModule,
} from '@angular/material';

import { Setting }    from './setting';
import { Option }    from './option/option';
import { OptionConfig, OptionCreateDialog } from './option/option-config';

import { SettingService } from './setting.service';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingRoutingModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
  ],
  declarations: [
    Setting,
    Option,
    OptionConfig,
    OptionCreateDialog,
  ],
  entryComponents: [
    OptionCreateDialog,
  ],
  providers: [ SettingService ]
})
export class SettingModule {}
