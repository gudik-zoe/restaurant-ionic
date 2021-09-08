/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from 'src/app/models/card';
import { ItemsService } from 'src/app/sharedComponents/item/items.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private itemsService: ItemsService
  ) {}
  rootUrl: string = environment.rootUrl;
  myCard: Card;
  getMyCard() {
    return new Promise<Card>((resolve, reject) => {
      return this.http.get(this.rootUrl + 'card').subscribe(
        async (card: Card) => {
          this.myCard = card;
          for (let item of this.myCard.items) {
            item.itemData = await this.itemsService.getItemById(item.itemId);
          }
          resolve(card);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getMyCardItemsNumber() {
    return this.http.get(this.rootUrl + 'card/cartLength');
  }
}
