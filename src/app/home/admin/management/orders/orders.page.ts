/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/home/client/order/order.service';
import openSocket from 'socket.io-client';
import { ModalController } from '@ionic/angular';
import { OrderModalComponent } from './order-modal/order-modal.component';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  constructor(
    private orderService: OrderService,
    private modalCtrl: ModalController
  ) {}

  result: any = [];

  async getOrders() {
    this.result = await this.orderService.getAllOrders();
    console.log(this.result);
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
        component: OrderModalComponent,
        componentProps: { order: order },
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss()
      }).then((result: any) => {
        if (result.role === 'confirm' && result.data.status === 'Preparing') {
          console.log("should be the prepare " + result.data)
          // this.setToPreparing(result.data.order.id);
        }else if (result.role === 'confirm' && result.data.status === 'Done'){
          console.log("should be the done " + result.data)
        }else{
          console.log("other thing")
        }
      })
      
  }

  async setToPreparing(orderId: any) {
    const editedORder = await this.orderService.editOrder(orderId);
    //to be continued
  }
  ngOnInit() {
    this.getOrders();
  }
}
