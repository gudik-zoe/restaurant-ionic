/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import openSocket from 'socket.io-client';
import { ModalController } from '@ionic/angular';
import { OrderModalAdminComponent } from './order-modal-admin/order-modal-admin.component';
import { OrderService } from 'src/app/shared/orders/order.service';
@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.page.html',
  styleUrls: ['./orders-admin.page.scss'],
})
export class OrdersAdminPage implements OnInit {
  constructor(
    private orderService: OrderService,
    private modalCtrl: ModalController
  ) {}

  result: any = [];

  async getOrders() {
    this.result = await this.orderService.getAllOrders();
    const socket = openSocket('http://localhost:3000/');
    socket.on('addOrder', (data: any) => {
      if (data.action === 'create') {
        this.result.orders.push(data.order);
      }
    });
  }

  openModal(order) {
    this.modalCtrl
      .create({
        component: OrderModalAdminComponent,
        componentProps: { order: order },
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
      let theOrder = this.result.orders.find(
        (order) => order._id === editedORder._id
      );
      theOrder.status = editedORder.status;
    }
  }
  ngOnInit() {
    this.getOrders();
  }
}
