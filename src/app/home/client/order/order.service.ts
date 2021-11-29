// /* eslint-disable prefer-const */
// /* eslint-disable arrow-body-style */
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Order } from 'src/app/models/order';
// import { ItemsService } from 'src/app/shared/item/items.service';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class OrderService {
//   rootUrl: string = environment.rootUrl;
//   constructor(private http: HttpClient, private itemService: ItemsService) {}

//   public addOrder(): Promise<Order> {
//     return new Promise<any>((resolve, reject) => {
//       return this.http.post(this.rootUrl + 'order', {}).subscribe(
//         (data: Order) => {
//           resolve(data);
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
//   }

//   public getOrders(): Promise<Order[]> {
//     return new Promise<any>((resolve, reject) => {
//       return this.http.get(this.rootUrl + 'order').subscribe(
//         async (orders: any) => {
//           for (let order of orders) {
//             for (let item of order.items) {
//               item.itemData = await this.itemService.getItemById(item.itemId);
//             }
//           }
//           resolve(orders);
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
//   }

//   public getAllOrders() {
//     return new Promise<any>((resolve, reject) => {
//       return this.http.get('http://localhost:3000/order/all').subscribe(
//         async (data: any) => {
//           if (data) {
//             for (let order of data.orders) {
//               for (let item of order.items) {
//                 item.itemData = await this.itemService.getItemById(item.itemId);
//               }
//             }
//             resolve(data);
//           }
//         },
//         (err) => {
//           reject(err);
//         }
//       );
//     });
//   }

//   public editOrder(orderId: number , status:string) {
//     return new Promise<any>((resolve, reject) => {
//       return this.http
//         .put(`http://localhost:3000/order/${orderId}/${status}`, {})
//         .subscribe(
//           (data) => {
//             if (data) {
//               resolve(data);
//             }
//           },
//           (err) => {
//             reject(err);
//           }
//         );
//     });
//   }
// }
