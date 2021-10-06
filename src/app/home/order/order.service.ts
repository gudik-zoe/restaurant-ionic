/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { ItemsService } from 'src/app/shared/item/items.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  rootUrl: string = environment.rootUrl;
  constructor(private http: HttpClient, private itemService: ItemsService) {}

  public addOrder(): Promise<Order> {
    return new Promise<any>((resolve, reject) => {
      return this.http.post(this.rootUrl + 'order', {}).subscribe(
        (data: Order) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getOrders(): Promise<Order[]> {
    return new Promise<any>((resolve, reject) => {
      return this.http.get(this.rootUrl + 'order').subscribe(
        async (data: any) => {
          // console.log(orders);
          for (let order of data.orders) {
            for (let item of order.items) {
              item.itemData = await this.itemService.getItemById(item.itemId);
            }
          }
          resolve(data.orders);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
