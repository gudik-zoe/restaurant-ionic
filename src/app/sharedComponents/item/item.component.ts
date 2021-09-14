/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CardService } from 'src/app/home/card/card.service';
import { Item } from 'src/app/models/item';
import { ResultList } from 'src/app/models/resultList';
import { ErrorHandlerService } from '../../utility/error-handler.service';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  constructor(
    private itemsService: ItemsService,
    public alertController: AlertController,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    public toastController: ToastController,
    private cardService: CardService
  ) {}
  @Input() category: string;
  items: Item[];

  public addToCart(item: Item) {
    this.itemsService.addItemToCard(item).subscribe(
      (data: any) => {
        if (data) {
          this.cardService.addToCardSubject.next({ quantity: 1, add: true });
          this.toastController
            .create({
              message: `item has been added succesfully`,
              duration: 2000,
              position: 'top',
            })
            .then((alertEl) => {
              alertEl.present();
            });
        }
      },
      (err) => {
        this.errorHandler.showError(err);
      }
    );
  }

  showError(error) {
    let message = 'Unknown error occured';
    let header = 'Error';
    if (error.status === 401) {
      header = 'Unauthorised';
      message = 'please sign in to be able to add items to your card';
    }
    this.alertController
      .create({
        header,
        message,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.router.navigate(['/home/login']);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  async getItems() {
    try {
      this.items = await this.itemsService.getItemsByCategory(this.category);
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    this.getItems();
  }
}
