import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Order } from './order';
import { OrderDetail } from './order-detail';

import { OrderListResolver } from './order-list-resolver.service';

const ordereRoute: Routes = [
    {
        path: '',
        canActivate: [ AuthGuard ],
        resolve: {
            user: OrderListResolver
        },
        children: [
            { path: '',  component: Order },
            { path: ':id', component: OrderDetail }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ordereRoute)
    ],
    providers: [
        OrderListResolver
    ],
    exports: [
        RouterModule
    ]
})
export class OrderRoutingModule {}
