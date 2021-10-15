/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-authentication',
  templateUrl: './confirm-authentication.component.html',
  styleUrls: ['./confirm-authentication.component.scss'],
})
export class ConfirmAuthenticationComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  @Input() email: string;
  temporaryPassword: string;
  confirmPassword() {
    // this.itemToAddData.emit(object);
    this.modalCtrl.dismiss(
      {
        email: this.email,
        temporaryPassword: this.temporaryPassword,
      },
      'confirm'
    );
  }

  ngOnInit() {}
}
