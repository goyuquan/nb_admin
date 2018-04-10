import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { User } from './user';
import { UserResolver } from './user-resolver.service';

const userRoute: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: User,
    resolve: {
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoute)
  ],
  providers: [
      UserResolver
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}
