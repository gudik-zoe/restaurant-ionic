/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonItemSliding,
  LoadingController,
} from '@ionic/angular';
import { Button } from 'selenium-webdriver';
import { Card } from 'src/app/models/card';
import { CardItem } from 'src/app/models/cardItem';
import { Order } from 'src/app/models/order';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { AuthService } from '../login/auth.service';
import { OrderService } from '../order/order.service';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit, OnDestroy {
  constructor(
    private cardService: CardService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private errorHandler: ErrorHandlerService,
    private orderService: OrderService,
    private loadingCtrl: LoadingController,
    private route: Router
  ) {}
  ngOnDestroy(): void {
    this.passedFromNgOnInit = false;
  }
  card: Card;
  total: number;
  order: Order;
  passedFromNgOnInit: boolean;

  private async getMyCard() {
    try {
      this.card = await this.cardService.getMyCard();
      console.log(this.card.total);
      this.total = this.card.total;
    } catch (err) {
      this.errorHandler.showError(err);
    }
  }

  public minus(item: CardItem) {
    if (item.quantity === 0) {
      return;
    }
    item.quantity--;
    this.card.total -= item.itemData.price;
  }

  public plus(item: CardItem) {
    item.quantity++;
    this.card.total += item.itemData.price;
  }

  ionViewWillLeave() {
    if (this.card && this.total !== this.card.total && this.card.total !== 0) {
      this.alertCtrl
        .create({
          message: 'sure you want to leave without saving the changes u made',
          buttons: [
            {
              text: `don't save`,
              handler: () => {
                this.alertCtrl.dismiss();
              },
            },
            {
              text: 'yes save',
              handler: () => {
                this.saveMyData();
              },
            },
          ],
        })
        .then((element) => {
          element.present();
        });
    }
  }

  async saveMyData() {
    try {
      const modifiedCard = await this.cardService.modifyCard(this.card);
      if (modifiedCard) {
        this.card = modifiedCard;
        let cardItemsNumber = 0;
        for (let item of this.card.items) {
          cardItemsNumber += item.quantity;
        }
        this.cardService.cardItemNumber.next(cardItemsNumber);
      }
    } catch (err) {
      this.errorHandler.showError(err);
    }
  }

  async confirmOrder() {
    if (this.card.items.length === 0) {
      return;
    }
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'adding order' })
      .then(async (loadingEl) => {
        loadingEl.present();
        try {
          this.order = await this.orderService.addOrder();
          if (this.order) {
            loadingEl.dismiss();
            this.card = null;
            this.route.navigate(['home/order']);
          }
        } catch (err) {
          loadingEl.dismiss();
          this.errorHandler.showError(err);
        }
      });
  }

  removeItem(item: CardItem, slidingEl: IonItemSliding) {
    this.alertCtrl
      .create({
        header: 'Alert',
        message: `are you sure you want to remove${item.itemData.title}from your card`,
        buttons: [
          {
            text: 'yes delete',
            handler: () => {
              this.deleteItemFromCard(item);
            },
          },
          {
            text: 'no keep it',
            handler: () => {
              this.alertCtrl.dismiss();
            },
          },
        ],
      })
      .then((element) => {
        element.present();
      });
  }

  async deleteItemFromCard(item: CardItem) {
    try {
      const card = await this.cardService.deleteItemFromCard(item);
      if (card) {
        this.card.items = this.card.items.filter(
          (theItem: CardItem) => theItem.itemId !== item.itemId
        );
        this.card.total -= item.quantity * item.itemData.price;
        if (this.card.total < 0) {
          this.card.total = 0;
        }
        this.cardService.addToCardSubject.next({
          quantity: item.quantity,
          add: false,
        });
      }
    } catch (err) {
      this.errorHandler.showError(err, 'home/card');
    }
  }

  ngOnInit() {
    console.log('in ng on init card');
    this.passedFromNgOnInit = true;
    if (this.authService.isAuthenticated()) {
      this.getMyCard();
    } else {
      this.card = null;
    }
  }
  ionViewWillEnter() {
    if (this.authService.isAuthenticated() && !this.passedFromNgOnInit) {
      this.getMyCard();
    } else {
      this.card = null;
    }
  }
}
