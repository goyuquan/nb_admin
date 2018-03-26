import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Order }    from './order';
import { OrderDetail }  from './order-detail';

import { OrderService } from './order.service';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrderRoutingModule,
  ],
  declarations: [
    Order,
    OrderDetail
  ],
  providers: [ OrderService ]
})
export class OrderModule {}
