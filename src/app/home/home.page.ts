/* eslint-disable prefer-const */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../models/card';
import { ErrorHandlerService } from '../utility/error-handler.service';
import { CardService } from './card/card.service';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  cardLength: number = null;
  userSignedIn: Subscription;
  constructor(
    private cardService: CardService,
    public authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}
  ngOnDestroy(): void {
    this.userSignedIn.unsubscribe();
  }

  getCardItemsNumber() {
    this.userSignedIn = this.authService.userSignedIn.subscribe(
      (data: boolean) => {
        if (data) {
          this.cardService.getMyCardItemsNumber().subscribe(
            (cardItemsNumber: number) => {
              this.cardLength = cardItemsNumber;
            },
            (error) => {
              console.log(error);
              this.cardLength = null;
            }
          );
        } else {
          this.cardLength = null;
        }
      }
    );
  }

  ionViewWillEnter() {
    console.log('entered home');
  }

  ngOnInitMethods() {
    this.cardService.getMyCardItemsNumber().subscribe(
      (cardItemsNumber: number) => {
        this.cardLength = cardItemsNumber;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.getCardItemsNumber();
    if (this.authService.isAuthenticated()) {
      this.ngOnInitMethods();
    }
  }
}
