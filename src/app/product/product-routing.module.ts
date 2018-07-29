import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

import { Product } from './index/index';
import { ProductDetail } from './detail/detail';
import { ProductEdit } from './edit/edit';
import { ProductCreate } from './create/create';

import { ProductListResolver } from './index/index-list-resolver.service';
import { ProductDetailResolver } from './detail/detail-resolver.service';

const producteRoute: Routes = [
  {
    path: '',
    canActivate: [ AuthGuard ],
    resolve: { products: ProductListResolver },
    children: [
      {
        path: 'create',
        component: ProductCreate,
      },
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
