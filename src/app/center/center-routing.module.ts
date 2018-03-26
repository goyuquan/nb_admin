import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../auth/can-deactivate-guard.service';
import { AuthGuard } from '../auth/auth-guard.service';

import { Center } from './center';
import { CenterList } from './center-list';
import { CenterDetail } from './center-detail';
import { CenterHome } from './center-home';

import { CenterDetailResolver } from './center-detail-resolver.service';


const centerRoute: Routes = [
  {
    path: '',
    component: Center,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        component: CenterList,
        children: [
          {
            path: ':id',
            component: CenterDetail,
            canDeactivate: [ CanDeactivateGuard ],
            resolve: {
              center: CenterDetailResolver
            }
          },
          {
            path: '',
            component: CenterHome
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild( centerRoute )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CenterDetailResolver
  ]
})
export class CenterRoutingModule {}
