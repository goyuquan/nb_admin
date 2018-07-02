import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Setting } from './setting';
import { Option } from './option/option';
import { OptionConfig } from './option/option-config';
import { OptionResolver } from './option/option-resolver.service';
import { OptionConfigResolver } from './option/option-config-resolver.service';

const settingRoute: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    component: Setting,
    children: [
      {
          path: 'option',
          component: Option,
          resolve: { options: OptionResolver },
      },
      {
          path: 'option/:id',
          component: OptionConfig,
          resolve: { options: OptionConfigResolver },
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
      OptionResolver,
      OptionConfigResolver
  ],
  exports: [
    RouterModule
  ]
})
export class SettingRoutingModule {}
