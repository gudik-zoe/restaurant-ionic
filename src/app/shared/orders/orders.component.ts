/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from './order.service';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/home/client/login/auth.service';
import openSocket from 'socket.io-client';
import { OrderModalComponent } from '../order-modal/order-modal.component';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private errorHandler: ErrorHandlerService,
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {}
  @Input() myOrders: Order[];
  @Input() isAdmin: boolean;
  order: Order;


  openModal(order: Order) {
    this.modalCtrl
      .create({
        component: OrderModalComponent,
        componentProps: { order: order , isAdmin :this.isAdmin },
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then((result: any) => {
        if (result.role === 'confirm' && result.data.status === 'Preparing') {
          this.updateOrderStatus(result.data.order._id, result.data.status);
        } else if (result.role === 'confirm' && result.data.status === 'Done') {
          this.updateOrderStatus(result.data.order._id, result.data.status);
        } else {
          console.log('other thing');
        }
      });
  }


  async updateOrderStatus(orderId: any, status: string) {
    const editedORder = await this.orderService.editOrder(orderId, status);
    if (editedORder) {
      let theOrder = this.myOrders.find(
        (order) => order._id === editedORder._id
      );
      theOrder.status = editedORder.status;
    }
  }

  public async addOrder() {
    try {
      this.order = await this.orderService.addOrder();
    } catch (err) {
      this.errorHandler.showError(err);
    }
  }

  ionViewWillEnter() {
    // if (this.authService.isAuthenticated() && !this.passedFromNgOnInit) {
    // this.getMyOrders();
    // } else {
    //   this.myOrders = null;
    // }
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      // this.getMyOrders();
    } else {
      this.myOrders = null;
    }
  }
}
