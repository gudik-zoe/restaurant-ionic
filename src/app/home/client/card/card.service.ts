/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AddItemSubject } from 'src/app/models/addItemSubject';
import { Card } from 'src/app/models/card';
import { CardItem } from 'src/app/models/cardItem';
import { ItemsService } from 'src/app/shared/item/items.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private http: HttpClient,
    private itemsService: ItemsService
  ) {}
  rootUrl: string = environment.rootUrl;
  myCard: Card;
  addToCardSubject = new Subject<AddItemSubject>();
  cardItemNumber = new Subject<number>();
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

  deleteItemFromCard(item: CardItem): Promise<Card> {
    return new Promise<Card>((resolve, reject) => {
      return this.http.delete(this.rootUrl + `card/${item.itemId}`).subscribe(
        (data: Card) => {
          resolve(data);
        },
        (err) => reject(err)
      );
    });
  }

  modifyCard(card: Card): Promise<Card> {
    return new Promise<Card>((resolve, reject) => {
      return this.http.put(this.rootUrl + 'card', card).subscribe(
        async (theModifiedCard: Card) => {
          for (let item of theModifiedCard.items) {
            item.itemData = await this.itemsService.getItemById(item.itemId);
          }
          resolve(theModifiedCard);
        },
        (err) => reject(err)
      );
    });
  }
}
