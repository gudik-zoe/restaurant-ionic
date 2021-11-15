/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { AuthService } from '../login/auth.service';
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
    private authService: AuthService
  ) {}
  myOrders: Order[];
  order: Order;
  passedFromNgOnInit: boolean = false;

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
    this.getMyOrders();
    // } else {
    //   this.myOrders = null;
    // }
  }

  ngOnInit() {
    this.passedFromNgOnInit = true;
    if (this.authService.isAuthenticated()) {
      this.getMyOrders();
    } else {
      this.myOrders = null;
    }
  }
}
