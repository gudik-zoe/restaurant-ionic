import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerServiceClientService } from 'src/app/home/client/customer-service-client/customer-service-client.service';
import { Room } from 'src/app/models/room';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import openSocket from 'socket.io-client';
@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  constructor(private acrivatedRouter: ActivatedRoute, private chatService: CustomerServiceClientService, private errorHandler: ErrorHandlerService) { }
  room: Room

  async sendInFather(event) {
    let messageObject = { text: event, type: 'admin' }
    let sentMessage = await this.chatService.respondeToCustomer(messageObject, this.room._id);
  }

  getRoomById() {
    try {
      this.acrivatedRouter.params.subscribe(async data => {
        this.room = await this.chatService.getRoomById(data.roomId)
        const socket = openSocket('http://localhost:3000/');
        socket.on(`sendMessage/${this.room.user}`, async (data: any) => {
          if (data) {
            this.room.messages.push(data);
          }
        });
      })
    } catch (err) {
      this.errorHandler.showError(err)
    }
  }

  ngOnInit() {
    this.getRoomById();
  }

}
