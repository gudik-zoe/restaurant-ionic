/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  constructor(
    private orderService: OrderService,
    private errorHandler: ErrorHandlerService
  ) {}
  myOrders: Order[];
  order: Order;

  public async getMyOrders() {
    try {
      this.myOrders = await this.orderService.getOrders();
      console.log(this.myOrders);
    } catch (err) {
      this.errorHandler.showError(err);
    }
  }

  public async addOrder() {
    try {
      this.order = await this.orderService.addOrder();
    } catch (err) {
      this.errorHandler.showError(err);
    }
  }

  ngOnInit() {
    console.log('entere ng on init of orders');
    this.getMyOrders();
  }
}
