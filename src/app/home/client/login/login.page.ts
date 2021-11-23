/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import openSocket from 'socket.io-client';

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
