/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import openSocket from 'socket.io-client';
import { ModalController } from '@ionic/angular';
import { OrderService } from 'src/app/shared/orders/order.service';
import { OrderModalComponent } from 'src/app/shared/order-modal/order-modal.component';
import { ItemsService } from 'src/app/shared/item/items.service';
@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.page.html',
  styleUrls: ['./orders-admin.page.scss'],
})
export class OrdersAdminPage implements OnInit {
  constructor(
    private orderService: OrderService,
    private modalCtrl: ModalController,
    private itemService: ItemsService
  ) {}

  result: any = [];

  async getOrders() {
    this.result = await this.orderService.getAllOrders();
    const socket = openSocket('http://localhost:3000/');
    socket.on('addOrder', async (data: any) => {
      if (data.action === 'create' && data.order) {
        console.log(data.order);
        for (let item of data.order.items) {
          item.itemData = await this.itemService.getItemById(item.itemId);
        } // data.order.itemData = await this.itemService.getItemById(data.order.id);
        this.result.orders.push(data.order);
      }
    });
  }

  openModal(order) {
    this.modalCtrl
      .create({
        component: OrderModalComponent,
        componentProps: { order: order, isAdmin: true },
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
