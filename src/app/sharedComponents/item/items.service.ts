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
  items: Item[];
  public getItemsByCategory(category: string) {
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
}