import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Product } from './product';
import { ProductDetail } from './product-detail';
import { ProductEdit } from './product-edit';

import { ProductListResolver } from './product-list-resolver.service';
import { ProductDetailResolver } from './product-detail-resolver.service';

const producteRoute: Routes = [
    {
        path: '',
        canActivate: [ AuthGuard ],
        resolve: { products: ProductListResolver },
        children: [
            {
                path: 'edit/:id',
                component: ProductEdit,
            },
            {
                path: ':id',
                component: ProductDetail,
                resolve: { product: ProductDetailResolver }
            },
            { path: '',  component: Product }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(producteRoute)
    ],
    providers: [
        ProductListResolver,
        ProductDetailResolver
    ],
    exports: [
        RouterModule
    ]
})
export class ProductRoutingModule {}
