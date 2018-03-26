import { Component, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { slideInDownAnimation } from '../animations';

import { OrderModel, OrderService } from './order.service';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.html',
  styleUrls: ['./order-detail.css'],
  animations: [ slideInDownAnimation ]
})
export class OrderDetail {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  // order: Order;
  order: any;
  // order: Observable<Order> | Promise<Order>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrderService
  ) {}

  ngOnInit() {


    //Observable模式，用于直接切换同一组件不同参数
    this.route.paramMap
      .switchMap(
        (params: ParamMap) => this.service.getOrder(params.get('id')))
      .subscribe((order: OrderModel) => this.order = order);

    //snapshot快照模式，用于非直接切换同一组件
    // let id = this.route.snapshot.paramMap.get('id');
    //
    // this.order = this.service.getOrder(id);
  }

  gotoOrderlist(order) {
    let orderId = order ? order.id : null;
    this.router.navigate(['/order', {id: orderId, abc: 'abc'}]);
  }
}
