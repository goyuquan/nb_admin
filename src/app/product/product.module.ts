import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
} from '@angular/material';

import { Product }    from './index/index';
import { ProductDetail }  from './detail/detail';
import { ProductEdit }  from './edit/edit';
import { ProductCreate }  from './create/create';

import { ProductService } from './product.service';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductRoutingModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatIconModule
    ],
    declarations: [
        Product,
        ProductDetail,
        ProductEdit,
        ProductCreate
    ],
    providers: [ ProductService ]
})
export class ProductModule {}
