/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ResultList } from 'src/app/models/resultList';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl;
  items: Item[] = [];
  public getItemsByCategory(category: string): Promise<Item[]> {
    // console.log('passed from here');
    return new Promise<Item[]>((resolve, reject) => {
      return this.http
        .get(this.rootUrl + `item?category=${category}`)
        .subscribe(
          (data: ResultList) => {
            this.items = data.result;
            resolve(this.items);
          },
          (error) => reject(error)
        );
    });
  }

  public addItemToCard(item: Item) {
    try {
      return this.http.post(this.rootUrl + 'card', {
        itemId: item._id,
        quantity: 1,
      });
    } catch (err) {
      console.log(err);
    }
  }

  public getItemById(itemId: string): Promise<Item> {
    let theRequestedItem;
    return new Promise<Item>((resolve, reject) => {
      theRequestedItem = this.items.find((item: Item) => item._id === itemId);
      if (theRequestedItem) {
        console.log('was already in memory');
        resolve(theRequestedItem);
      } else {
        return this.http.get<Item>(this.rootUrl + `item/${itemId}`).subscribe(
          (item: Item) => {
            console.log('did the chiamata');
            this.items.push(item);
            resolve(item);
          },
          (err) => reject(err)
        );
      }
    });
  }
}
