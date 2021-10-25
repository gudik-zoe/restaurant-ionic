/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor() {}

  signIn: boolean = true;

  onFilter(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'signIn') {
      this.signIn = true;
    } else {
      this.signIn = false;
    }
  }

  ngOnInit() {}
}
