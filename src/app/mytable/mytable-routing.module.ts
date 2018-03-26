import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { MyTable } from './mytable';
import { MyTableResolver } from './mytable-resolver.service';

const mytableeRoute: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: MyTable,
    resolve: {
      mytable: MyTableResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mytableeRoute)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MyTableResolver
  ]
})
export class MyTableRoutingModule {}
