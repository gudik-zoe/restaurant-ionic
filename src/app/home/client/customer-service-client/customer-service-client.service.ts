/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceClientService {
  getUserMessages() {
    console.log("getting user's messages")
    return new Promise((res, rej) => {
      return this.http.get(this.rootUrl + 'chat').subscribe((messages: any) => {
        if (messages) {
          res(messages)
        }
      }, err => rej(err))

    })
  }
  getRooms() {
    return this.http.get(this.rootUrl + 'chat/rooms').toPromise();
  }
  rootUrl: string = environment.rootUrl;
  constructor(private http: HttpClient) { }

  sendMessage(messageBody) {
    return new Promise((resolve, reject) => {
      return this.http.post(this.rootUrl + 'chat', { messageBody }).subscribe(
        (data) => {
          if (data) {
            resolve(data);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
