import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { Login } from './login';
import { Register } from './register';

const authRoute: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoute)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
  ]
})
export class AuthRoutingModule { }
