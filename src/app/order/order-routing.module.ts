import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Order } from './order';
import { OrderDetail } from './order-detail';

const ordereRoute: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    children: [
      { path: '',  component: Order },
      { path: ':id', component: OrderDetail }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ordereRoute)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule {}
