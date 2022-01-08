/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import openSocket from 'socket.io-client';
import { CustomerServiceClientService } from 'src/app/home/client/customer-service-client/customer-service-client.service';
import { AuthService } from 'src/app/home/client/login/auth.service';
@Component({
  selector: 'app-customer-service-admin',
  templateUrl: './customer-service-admin.page.html',
  styleUrls: ['./customer-service-admin.page.scss'],
})
export class CustomerServiceAdminPage implements OnInit {
  constructor(private chatService: CustomerServiceClientService, private authService: AuthService) { }
  messages = [];
  theMessage
  rooms;

  async getRooms() {
    this.rooms = await this.chatService.getRooms();

  }
  async getMessages() {
    const socket = openSocket('http://localhost:3000/');
    socket.on(`sendMessage`, async (data: any) => {
      if (data) {
        this.messages.push(data);
      }
    });
  }

  async sendInFather(event) {
    let messageObject = { text: event, type: 'admin' }
    let sentMessage = await this.chatService.sendMessage(messageObject);
    if (sentMessage) {
      this.messages.push(sentMessage);
    }
    this.theMessage = null;
  }

  ngOnInit() {
    this.getRooms();
  }
}
