/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
})
export class SelectItemComponent implements OnInit {
  @Input() item: Item;
  @Output() itemToAddData = new EventEmitter<any>();
  quantity: number = 1;
  constructor(private modalCtrl: ModalController) {}
  minus(item: Item) {
    if (this.quantity === 0) {
      return;
    }
    this.quantity--;
  }

  plus(item: Item) {
    this.quantity++;
  }

  confirmOrder() {
    // this.itemToAddData.emit(object);
    this.modalCtrl.dismiss(
      {
        item: this.item,
        quantity: this.quantity,
      },
      'confirm'
    );
  }
  ngOnInit() {}
}
