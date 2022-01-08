/* eslint-disable @typescript-eslint/ban-types */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() messages: String[] = [];
  @Output() sendMessage = new EventEmitter<string>();
  theMessage: string;
  constructor() {}

  send() {
    console.log('the message' + this.theMessage);
    this.sendMessage.emit(this.theMessage);
    this.theMessage = null;
  }

  getClasses(messageType) {
    return {
      client: messageType === 'client',
      admin: messageType === 'admin',
    };
  }

  ngOnInit() {
  }
}
