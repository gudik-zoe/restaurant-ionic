import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {
  @Input() order: any;
  constructor(private modalCtrl: ModalController) {}

  onClose() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    if (this.order) {
      console.log(this.order);
    }
  }
}
