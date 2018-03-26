import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Dashboard }    from './dashboard';

const dashboardRoute: Routes = [
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    component: Dashboard
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
