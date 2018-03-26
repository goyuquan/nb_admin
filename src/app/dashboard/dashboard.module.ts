import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Dashboard }    from './dashboard';

import { DashboardService } from './dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    Dashboard
  ],
  providers: [ DashboardService ]
})
export class DashboardModule {}
