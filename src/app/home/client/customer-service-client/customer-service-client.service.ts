/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerServiceClientService {
  rootUrl: string = environment.rootUrl;
  constructor(private http: HttpClient) {}

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      return this.http.post(this.rootUrl + 'chat', { message }).subscribe(
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
