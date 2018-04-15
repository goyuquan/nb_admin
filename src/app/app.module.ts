import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { CachingInterceptor } from './share/caching-interceptor'; //TODO HTTP缓存拦截器
import { HttpsInterceptor } from './share/http-interceptor'; //HTTP拦截器
import { ResponseInterceptor } from './share/response-interceptor'; //HTTP响应拦截器
import { ErrorInterceptor } from './share/error-interceptor'; //HTTP响应拦截器


import { App } from './app';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';

import { Message } from './message';
import { NotFound } from './not-found';

import { AuthService } from './auth/auth.service';
import { DialogService } from './dialog.service';
import { HttpService } from './share/http.service';
import { ErrorService } from './share/error.service';
import { ConfigService } from './share/config.service';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatGridListModule,
  MatIconModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatProgressBarModule,
  MatSnackBarModule,
} from '@angular/material';

import 'hammerjs';

@NgModule({
  declarations: [
    App,
    Message,
    NotFound
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatProgressBarModule,
    MatSnackBarModule,

    FormsModule,

    AuthModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [
    DialogService,
    AuthService,
    HttpService,
    ErrorService,
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [ App ]
})
export class AppModule {
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
