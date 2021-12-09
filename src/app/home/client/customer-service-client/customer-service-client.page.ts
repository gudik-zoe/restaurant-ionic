import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-service-client',
  templateUrl: './customer-service-client.page.html',
  styleUrls: ['./customer-service-client.page.scss'],
})
export class CustomerServiceClientPage implements OnInit {
  messages = [];
  theMessage: string;
  constructor() {}

  send() {
    this.messages.push(this.theMessage);
    this.theMessage = null;
  }

  ngOnInit() {}
}
