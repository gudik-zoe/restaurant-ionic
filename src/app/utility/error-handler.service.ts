/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-cond-assign */
// eslint-disable-next-line @typescript-eslint/type-annotation-spacing
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}
  errorMessage: string = '';
  showError(
    error: HttpErrorResponse,
    header: string = '',
    route: string = '',
    text: string = 'ok'
  ) {
    if (error.error.status === 422 && error.error.data) {
      for (let message of error.error.data) {
        this.errorMessage += message + '\n';
      }
    } else {
      this.errorMessage = error.error.message;
    }
    this.alertController
      .create({
        header: header,
        message: this.errorMessage,
        buttons: [
          {
            text,
            handler: () => {
              this.router.navigate([route]);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
