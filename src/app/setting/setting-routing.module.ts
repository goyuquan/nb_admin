import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Setting } from './setting';
import { Option } from './option';
import { SettingDetail } from './setting-detail';

import { SettingListResolver } from './setting-list-resolver.service';
import { SettingDetailResolver } from './setting-detail-resolver.service';

const settingeRoute: Routes = [
    {
        path: '',
        canActivate: [ AuthGuard ],
        resolve: { options: SettingListResolver },
        children: [
            {
                path: 'option',
                component: Option,
                // resolve: { options: SettingListResolver }
            },
            {
                path: '/settingdetail',
                component: SettingDetail,
                // resolve: { setting: SettingDetailResolver }
            },
            { path: '',  component: Option }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(settingeRoute)
    ],
    providers: [
        SettingListResolver,
        SettingDetailResolver
    ],
    exports: [
        RouterModule
    ]
})
export class SettingRoutingModule {}
