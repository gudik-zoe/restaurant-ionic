/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import openSocket from 'socket.io-client';
@Component({
  selector: 'app-customer-service-admin',
  templateUrl: './customer-service-admin.page.html',
  styleUrls: ['./customer-service-admin.page.scss'],
})
export class CustomerServiceAdminPage implements OnInit {
  constructor() {}
  messages: String[] = [];

  async getMessages() {
    const socket = openSocket('http://localhost:3000/');
    socket.on('sendMessage', async (data: any) => {
      console.log('heey we received a message ' + data);
      if (data) {
        this.messages.push(data.message);
      }
    });
  }

  ngOnInit() {
    this.getMessages();
  }
}
