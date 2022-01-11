/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import openSocket from 'socket.io-client';
import { CustomerServiceClientService } from 'src/app/home/client/customer-service-client/customer-service-client.service';
import { AuthService } from 'src/app/home/client/login/auth.service';
import { ChatComponent } from 'src/app/shared/chat/chat.component';
@Component({
  selector: 'app-customer-service-admin',
  templateUrl: './customer-service-admin.page.html',
  styleUrls: ['./customer-service-admin.page.scss'],
})
export class CustomerServiceAdminPage implements OnInit {
  constructor(private chatService: CustomerServiceClientService) { }
  rooms;

  async getRooms() {
    this.rooms = await this.chatService.getRooms();
  }
  // async getMessages() {
  //   const socket = openSocket('http://localhost:3000/');
  //   socket.on(`sendMessage`, async (data: any) => {
  //     if (data) {
  //       this.messages.push(data);
  //     }
  //   });
  // }

  // async sendInFather(event) {
  //   let messageObject = { text: event, type: 'admin' }
  //   let sentMessage = await this.chatService.sendMessage(messageObject);
  //   if (sentMessage) {
  //     this.messages.push(sentMessage);
  //   }
  //   this.theMessage = null;
  // }

  // enterRoom(roomId) {
  //   let theRequestedRoom = this.rooms.find(room => room._id === roomId)
  //   this.modalCtrl
  //     .create({
  //       component: ChatComponent,
  //       componentProps: { messages: theRequestedRoom.messages },
  //     }).then((modalEL) => {
  //       modalEL.present();
  //       return modalEL.onDidDismiss();
  //     })
  // }

  // openModal(order) {
  //   this.modalCtrl
  //     .create({
  //       component: OrderModalComponent,
  //       componentProps: { order: order, isAdmin: true },
  //     })
  //     .then((modalEL) => {
  //       modalEL.present();
  //       return modalEL.onDidDismiss();
  //     })
  //     .then((result: any) => {
  //       if (result.role === 'confirm' && result.data.status === 'Preparing') {
  //         this.updateOrderStatus(result.data.order._id, result.data.status);
  //       } else if (result.role === 'confirm' && result.data.status === 'Done') {
  //         this.updateOrderStatus(result.data.order._id, result.data.status);
  //       } else {
  //         console.log('other thing');
  //       }
  //     });
  // }




  ngOnInit() {
    this.getRooms();
  }
}
