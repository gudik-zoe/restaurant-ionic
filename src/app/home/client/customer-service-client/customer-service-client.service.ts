/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from 'src/app/models/room';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceClientService {
  rootUrl: string = environment.rootUrl + 'chat/'
  getRoomById(roomId: string) {
    return new Promise<Room>((res, rej) => {
      return this.http.get(this.rootUrl + `rooms/${roomId}`).subscribe((room: Room) => {
        if (room) {
          res(room)
        }
      }, err => rej(err))
    })
  }
  getUserRoom() {
    return new Promise<Room>((res, rej) => {
      return this.http.get(this.rootUrl).subscribe((room: Room) => {
        if (room) {
          res(room)
        }
      }, err => rej(err))

    })
  }
  getRooms() {
    return this.http.get<Room[]>(this.rootUrl + 'rooms').toPromise();
  }

  constructor(private http: HttpClient) { }

  respondeToCustomer(messageBody, roomId) {
    return new Promise((resolve, reject) => {
      return this.http.post(this.rootUrl + `rooms/${roomId}`, { messageBody }).subscribe(
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

  sendMessage(messageBody) {
    return new Promise((resolve, reject) => {
      return this.http.post(this.rootUrl, { messageBody }).subscribe(
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
