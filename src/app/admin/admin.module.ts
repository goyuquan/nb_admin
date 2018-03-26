import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { Admin }           from './admin';
import { AdminDashboard }  from './admin-dashboard';
import { ManageCenter }    from './manage-center';
import { ManageOrder }    from './manage-order';

import { AdminRoutingModule }       from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    Admin,
    AdminDashboard,
    ManageCenter,
    ManageOrder
  ]
})
export class AdminModule {}
