import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Admin } from './admin';
import { ManageCenter } from './manage-center';
import { ManageOrder } from './manage-order';
import { AdminDashboard } from './admin-dashboard';

import { AuthGuard } from '../auth/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '',
    component: Admin,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        canActivateChild: [ AuthGuard ],
        children: [
          { path: 'center', component: ManageCenter },
          { path: 'order', component: ManageOrder },
          { path: '', component: AdminDashboard }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
