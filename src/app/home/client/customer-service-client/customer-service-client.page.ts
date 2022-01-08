/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { CustomerServiceClientService } from './customer-service-client.service';
import openSocket from 'socket.io-client';
import { AuthService } from '../login/auth.service';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
@Component({
  selector: 'app-customer-service-client',
  templateUrl: './customer-service-client.page.html',
  styleUrls: ['./customer-service-client.page.scss'],
})
export class CustomerServiceClientPage implements OnInit {
  userMessages;
  theMessage: string;
  userId: string
  constructor(private chatService: CustomerServiceClientService, private authService: AuthService, private errorHandler: ErrorHandlerService) { }

  async sendInFather(event) {
    let messageObject = { text: event, type: 'client' }
    let sentMessage = await this.chatService.sendMessage(messageObject);
    // if (sentMessage) {
    //   console.log("sent message " + sentMessage)
    //   this.userMessages.push(messageObject);
    // }
    this.theMessage = null;
  }

  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  async getMessages() {
    try {
      this.userId = await this.authService.getUserId()
      this.userMessages = await this.chatService.getUserMessages();
      console.log("user's id " + this.userId)
      if (this.userMessages && this.userMessages.length > 0) {
        console.log(this.userMessages)
        this.userMessages.push(this.userMessages);
      }
      const socket = openSocket('http://localhost:3000/');
      socket.on(`sendMessage/${this.userId}`, async (data: any) => {
        if (data) {
          console.log("receiving new message")
          this.userMessages.push(data);
        }
      });
    } catch (err) {
      this.errorHandler.showError(err)
    }
  }

  ngOnInit() {
    this.getMessages()
  }
}
