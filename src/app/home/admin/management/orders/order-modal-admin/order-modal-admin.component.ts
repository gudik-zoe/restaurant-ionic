import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal-admin.component.html',
  styleUrls: ['./order-modal-admin.component.scss'],
})
export class OrderModalAdminComponent implements OnInit {
  @Input() order: any;
  constructor(private modalCtrl: ModalController) {}

  onClose() {
    this.modalCtrl.dismiss();
  }

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

  ngOnInit() {}
}
