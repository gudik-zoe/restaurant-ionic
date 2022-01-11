/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { CustomerServiceClientService } from './customer-service-client.service';
import openSocket from 'socket.io-client';
import { AuthService } from '../login/auth.service';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { Room } from 'src/app/models/room';
@Component({
  selector: 'app-customer-service-client',
  templateUrl: './customer-service-client.page.html',
  styleUrls: ['./customer-service-client.page.scss'],
})
export class CustomerServiceClientPage implements OnInit {
  room: Room
  theMessage: string;
  userId: string
  constructor(private chatService: CustomerServiceClientService, private authService: AuthService, private errorHandler: ErrorHandlerService) { }

  async sendInFather(event) {
    let messageObject = { text: event, type: 'client' }
    let sentMessage = await this.chatService.sendMessage(messageObject);
    this.theMessage = null;
  }

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  async getUserRoom() {
    try {
      this.userId = await this.authService.getUserId()
      this.room = await this.chatService.getUserRoom();
      const socket = openSocket('http://localhost:3000/');
      socket.on(`sendMessage/${this.userId}`, async (data: any) => {
        if (data) {
          this.room.messages.push(data);
        }
      });
    } catch (err) {
      this.errorHandler.showError(err)
    }
  }

  ngOnInit() {
    this.getUserRoom()
  }
}
