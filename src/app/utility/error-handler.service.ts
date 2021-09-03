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

  // eslint-disable-next-line @typescript-eslint/type-annotation-spacing
  showError(
    error: HttpErrorResponse,
    route: string = '',
    // header: string = 'error',
    // message: string = 'unknown error occured',
    text: string = 'ok'
  ) {
    console.log(error.error);
    this.alertController
      .create({
        header: error.error.status,
        message: error.error.message,
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
