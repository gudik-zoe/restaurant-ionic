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
  order: Order;

  // public async getMyOrders() {
  //   try {
  //     this.myOrders = await this.orderService.getOrders();
  //     const socket = openSocket('http://localhost:3000/');
  //     socket.on('editOrder', (data: any) => {
  //       if (data.action === 'edit') {
  //         for (let order of this.myOrders) {
  //           if (order._id === data.order._id) {
  //             order.status = data.order.status;
  //           }
  //         }
  //       }
  //     });
  //   } catch (err) {
  //     this.errorHandler.showError(err);
  //   }
  // }

  openModal(order: Order) {
    this.modalCtrl
      .create({
        component: OrderModalComponent,
        componentProps: { order: order },
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      });
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
