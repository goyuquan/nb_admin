import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { OrderModel, OrderService } from './order.service';
import { HttpService } from '../share/http.service';

@Component({
  selector: 'order',
  templateUrl: './order.html',
  styleUrls: ['./order.css'],
})
export class Order {
  detail_list = [
    {name: 'one', id: 11},
    {name: 'two', id: 12},
    {name: 'three', id: 13},
    {name: 'four', id: 14},
  ];
  orders$: Observable<OrderModel[]>;

  private selectedId: number;
  results: string[];

  constructor(
    private http: HttpService,
    private service: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.orders$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getOrderes();
      });
  }

  isSelected(order: OrderModel) { return order.id === this.selectedId; }
}
