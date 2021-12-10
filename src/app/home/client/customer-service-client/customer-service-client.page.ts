/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { CustomerServiceClientService } from './customer-service-client.service';

@Component({
  selector: 'app-customer-service-client',
  templateUrl: './customer-service-client.page.html',
  styleUrls: ['./customer-service-client.page.scss'],
})
export class CustomerServiceClientPage implements OnInit {
  messages = [];
  theMessage: string;
  constructor(private chatService: CustomerServiceClientService) {}

  async sendInFather(event) {
    console.log('arriving here');
    let sentMessage = await this.chatService.sendMessage(event);
    if (sentMessage) {
      this.messages.push(sentMessage);
    }
    this.theMessage = null;
  }

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  ngOnInit() {}
}
