/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CardService } from 'src/app/home/card/card.service';
import { AddItemSubject } from 'src/app/models/addItemSubject';
import { Item } from 'src/app/models/item';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { ItemsService } from '../items.service';

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
