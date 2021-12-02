/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}
  @Input() isAdmin: any;
  @Input() order: Order;
  @Output() putOrderStatusOnPreparing = new EventEmitter();
  @Output() putOrderStatusOnDone = new EventEmitter();

  setOrderStatusOnPreparing() {
    this.modalCtrl.dismiss(
      {
        order: this.order,
        status: 'Preparing',
      },
      'confirm'
    );
  }

  setOrderStatusOnDone() {
    this.modalCtrl.dismiss(
      {
        order: this.order,
        status: 'Done',
      },
      'confirm'
    );
  }

  onClose() {
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
    console.log(this.order);
  }
}
