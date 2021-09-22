/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  constructor(
    private orderService: OrderService,
    private errorHandler: ErrorHandlerService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
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

  openModal(order: Order) {
    this.modalCtrl
      .create({
        component: OrderModalComponent,
        componentProps: { order: order },
      })
      .then((modalEL) => {
        modalEL.present();
        return modalEL.onDidDismiss();
      })
      .then((result) => {
        console.log(result);
      });
  }

  public async addOrder() {
    try {
      this.order = await this.orderService.addOrder();
    } catch (err) {
      this.errorHandler.showError(err);
    }
  }
  getOrderDetails(order: Order) {
    this.actionSheetCtrl
      .create({
        header: 'order details',
        buttons: [
          {
            text: 'Select date',
            handler: () => {
              console.log('select date');
            },
          },
          {
            text: 'Random date',
            handler: () => {
              console.log('random  date');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => actionSheetEl.present());
  }

  ngOnInit() {
    this.getMyOrders();
  }
}
