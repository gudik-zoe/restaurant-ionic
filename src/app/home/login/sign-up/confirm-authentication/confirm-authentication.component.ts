/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ConfirmAuth } from 'src/app/models/confirmauth';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-confirm-authentication',
  templateUrl: './confirm-authentication.component.html',
  styleUrls: ['./confirm-authentication.component.scss'],
})
export class ConfirmAuthenticationComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}

  @Input() email: string;
  temporaryPassword: string;
  token: string;

  confirmPassword() {
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'checking temporary password...',
      })
      .then(async (loadingEl) => {
        try {
          loadingEl.present();
          this.token = await this.authService.confirmUserByTemporaryPassword({
            email: this.email,
            temporaryPassword: this.temporaryPassword,
          });

          this.modalCtrl.dismiss(
            {
              token: this.token,
            },
            'confirm'
          );
        } catch (err) {
          loadingEl.dismiss();
          this.errorHandler.showError(err);
        }
      });
  }

  ngOnInit() {}
}
