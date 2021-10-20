/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ConfirmAuth } from 'src/app/models/confirmauth';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { Custome } from 'src/app/utility/validator';
import { AuthService } from '../auth.service';
import { ConfirmAuthenticationComponent } from './confirm-authentication/confirm-authentication.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private router: Router
  ) {}
  signUpForm: FormGroup;
  signUpSuccessful: any;
  token: string;
  @Output() goToLogin = new EventEmitter<boolean>();
  fillSignUpForm() {
    this.signUpForm = this.formbuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
      // { validator: [Custome.PasswordConfirmation, Custome.passwordPattern] }
    );
  }

  goToLoginInParent() {
    this.toastController
      .create({
        message: `insert the password that you recieved on that email`,
        duration: 2000,
        position: 'top',
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  async signUp() {
    if (!this.signUpForm.valid) {
      return;
    } else {
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'signin you up..' })
        .then(async (loadingEl) => {
          loadingEl.present();
          try {
            this.signUpSuccessful = await this.authService.signUp(
              this.signUpForm.value
            );
            loadingEl.dismiss();
            this.goToLoginInParent();
            console.log(this.signUpForm.value.email);
            this.modalCtrl
              .create({
                component: ConfirmAuthenticationComponent,
                componentProps: { email: this.signUpForm.value.email },
              })
              .then((element) => {
                element.present();
                return element.onDidDismiss();
              })
              .then((result: any) => {
                if (result.role === 'confirm') {
                  this.token = result.data.token;
                  localStorage.setItem('token', this.token);
                  this.loadingCtrl.dismiss();
                  this.authService.userSignedIn.next(true);
                  this.router.navigate(['/home/menu']);
                  // this.confirmUserByTemporaryPassword(result.data);
                }
              });
            // this.goToLogin.next(true);
          } catch (err) {
            loadingEl.dismiss();
            this.errorHandler.showError(err, 'error signing up');
          }
        });
    }
  }

  confirmUserByTemporaryPassword(confirmUser: ConfirmAuth) {
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'checking temporary password...',
      })
      .then(async (loadingEl) => {
        try {
          loadingEl.present();
          this.token = await this.authService.confirmUserByTemporaryPassword(
            confirmUser
          );
          localStorage.setItem('token', this.token);
          this.loadingCtrl.dismiss();
          this.authService.userSignedIn.next(true);
          this.router.navigate(['/home/menu']);
        } catch (err) {
          loadingEl.dismiss();
          this.errorHandler.showError(err);
        }
      });
  }

  ngOnInit() {
    this.fillSignUpForm();
  }
}
