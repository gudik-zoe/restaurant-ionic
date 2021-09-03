/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from 'src/app/models/card';
import { environment } from 'src/environments/environment';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  rootUrl: string = environment.rootUrl;
  myCard: Card;
  getMyCard() {
    return new Promise<Card>((resolve, reject) => {
      return this.http.get(this.rootUrl + 'card').subscribe(
        (card: Card) => {
          this.myCard = card;
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
