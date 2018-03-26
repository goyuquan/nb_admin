import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from './auth-routing.module';
import { Login } from './login';
import { Register } from './register';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,

    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    Login,
    Register,
  ],
  providers: [  ]
})
export class AuthModule {}
