/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddItemSubject } from '../models/addItemSubject';
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
  cardLength: number = 0;
  userSignedIn: Subscription;
  addToCardSubjectSubscription: Subscription;
  cardItemsNumber: Subscription;
  userIsAuthenticated: boolean = false;
  constructor(
    private cardService: CardService,
    public authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}
  ngOnDestroy() {
    this.userSignedIn.unsubscribe();
    this.addToCardSubjectSubscription.unsubscribe();
    this.cardItemsNumber.unsubscribe();
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
              this.errorHandler.showError(error);
              this.cardLength = null;
            }
          );
        } else {
          this.cardLength = null;
        }
      }
    );
  }

  ionViewDidEnter() {
    this.ngOnInitMethods();
  }

  ngOnInitMethods() {
    this.userSignedIn = this.authService.userSignedIn.subscribe(
      (data: boolean) => {
        console.log('first ng on init method in home');
        if (data) {
          console.log('data in userSignIn subject' + data);
          this.userIsAuthenticated = true;
          this.cardService.getMyCardItemsNumber().subscribe(
            (cardItemsNumber: number) => {
              console.log(cardItemsNumber);
              this.cardLength = cardItemsNumber;
            },
            (error) => {
              this.userIsAuthenticated = false;
              this.errorHandler.showError(error);
              this.cardLength = null;
            }
          );
        } else {
          this.userIsAuthenticated = false;
          this.cardLength = null;
        }
      }
    );
    this.addToCardSubjectSubscription =
      this.cardService.addToCardSubject.subscribe((data: AddItemSubject) => {
        console.log('second ng on init method in home');
        if (data.add) {
          this.cardLength = this.cardLength + data.quantity;
        } else {
          this.cardLength -= data.quantity;
        }
      });
    this.cardItemsNumber = this.cardService.cardItemNumber.subscribe(
      (data: number) => {
        console.log('third ng on init method in home');
        if (data) {
          this.cardLength = data;
        }
      }
    );
  }

  ngOnInit() {
    // this.getCardItemsNumber();
    // if (this.authService.isAuthenticated()) {
    if (this.authService.isAuthenticated()) {
      this.userIsAuthenticated = true;
      this.ngOnInitMethods();
    }
    // }
  }
}
