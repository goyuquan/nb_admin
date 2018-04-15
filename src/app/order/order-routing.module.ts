import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Order } from './order';
import { OrderDetail } from './order-detail';

import { OrderListResolver } from './order-list-resolver.service';
import { OrderDetailResolver } from './order-detail-resolver.service';

const ordereRoute: Routes = [
    {
        path: '',
        canActivate: [ AuthGuard ],
        resolve: { orders: OrderListResolver },
        children: [
            {
                path: ':id',
                component: OrderDetail,
                resolve: { order: OrderDetailResolver }
            },
            { path: '',  component: Order }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ordereRoute)
    ],
    providers: [
        OrderListResolver,
        OrderDetailResolver
    ],
    exports: [
        RouterModule
    ]
})
export class OrderRoutingModule {}
