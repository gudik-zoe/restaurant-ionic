import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {
  @Input() order: Order;
  constructor(private modalCtrl: ModalController) {}

  onClose() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {}
}
