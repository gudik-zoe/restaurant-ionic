/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { AuthService } from '../login/auth.service';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  constructor(
    private cardService: CardService,
    private authService: AuthService
  ) {}
  card: Card;

  private async getMyCard() {
    try {
      this.card = await this.cardService.getMyCard();
    } catch (err) {
      console.log(err);
    }
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.getMyCard();
    } else {
      this.card = null;
    }
  }
  ionViewWillEnter() {
    console.log('entered');
    if (this.authService.isAuthenticated()) {
      this.getMyCard();
    } else {
      this.card = null;
    }
  }
}
