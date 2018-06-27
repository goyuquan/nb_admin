import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Setting } from './setting';
import { Option } from './option';
import { SettingResolver } from './setting-resolver.service';

const settingRoute: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: Setting,
    children: [
      {
          path: 'option',
          component: Option,
          resolve: { options: SettingResolver },
      },
      { path: '',  redirectTo: 'option' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(settingRoute)
  ],
  providers: [
      SettingResolver
  ],
  exports: [
    RouterModule
  ]
})
export class SettingRoutingModule {}
