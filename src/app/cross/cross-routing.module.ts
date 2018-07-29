import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { AddOption } from './option/add';

import { CrossResolver } from './cross-resolver.service';

const crossRoute: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    resolve: { products: CrossResolver },
    children: [
      { path: '',  component: AddOption }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(crossRoute)
  ],
  providers: [
    CrossResolver,
  ],
  exports: [
    RouterModule
  ]
})
export class CrossRoutingModule {}
