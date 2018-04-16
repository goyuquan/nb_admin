import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import {
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
} from '@angular/material';

import { Product }    from './product';
import { ProductDetail }  from './product-detail';
import { ProductEdit }  from './product-edit';

import { ProductService } from './product.service';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProductRoutingModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule
    ],
    declarations: [
        Product,
        ProductDetail,
        ProductEdit
    ],
    providers: [ ProductService ]
})
export class ProductModule {}
