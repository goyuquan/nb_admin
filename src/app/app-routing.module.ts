import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules }  from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { Message } from './message';

import { NotFound } from './not-found';
import { CanDeactivateGuard } from './auth/can-deactivate-guard.service';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: 'message', component: Message, outlet: 'popup' },
  // { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuard] }, //只有在用户已登录的情况下我们才加载AdminModule
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' }, //自定义预加载策略
  { path: 'center', loadChildren: 'app/center/center.module#CenterModule' }, //自定义预加载策略
  { path: 'order', loadChildren: 'app/order/order.module#OrderModule' }, //自定义预加载策略
  { path: 'table', loadChildren: 'app/mytable/mytable.module#MyTableModule' }, //自定义预加载策略
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NotFound }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        preloadingStrategy: PreloadAllModules
      },
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule {}
