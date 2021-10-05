/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private toastController: ToastController
  ) {}

  signIn: boolean = true;
  onSubmit(myForm: NgForm) {
    if (!myForm.valid) {
      return;
    }
    const email = myForm.value.email;
    const password = myForm.value.password;
    if (this.signIn) {
      console.log(email + ' ' + password + 'signing in ');
    } else {
      console.log(email + ' ' + password + 'signing up ');
    }
  }
  goToLoginInParent(data: boolean) {
    if (data) {
      this.signIn = true;
      this.toastController
        .create({
          message: `Signed up succesfully`,
          duration: 2000,
          position: 'top',
        })
        .then((alertEl) => {
          alertEl.present();
        });
    }
  }

  switchAuthMode() {
    this.signIn = !this.signIn;
  }

  login(myForm) {
    if (!myForm.valid) {
      return;
    }
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'loggin in' })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService
          .login(myForm.value.email, myForm.value.password)
          .subscribe(
            (data: any) => {
              if (data) {
                localStorage.setItem('token', data.token);
                this.authService.userSignedIn.next(true);
                loadingEl.dismiss();
                this.router.navigate(['/home/menu']);
              }
            },
            (error) => {
              loadingEl.dismiss();
              this.errorHandler.showError(error, 'home/login');
            }
          );
        //
        // }, 500);
      });
    console.log('logiin!');
  }

  ngOnInit() {}
}
