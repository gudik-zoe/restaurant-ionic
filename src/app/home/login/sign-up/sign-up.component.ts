/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { Custome } from 'src/app/utility/validator';
import { AuthService } from '../auth.service';

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
    private loadingCtrl: LoadingController
  ) {}
  signUpForm: FormGroup;
  signUpSuccessful: any;
  @Output() goToLogin = new EventEmitter<boolean>();
  fillSignUpForm() {
    this.signUpForm = this.formbuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }
      // { validator: [Custome.PasswordConfirmation, Custome.passwordPattern] }
    );
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
            this.goToLogin.next(true);
            loadingEl.dismiss();
          } catch (err) {
            console.log('here');
            loadingEl.dismiss();
            this.errorHandler.showError(err, 'error signing up');
          }
        });
    }
  }

  ngOnInit() {
    this.fillSignUpForm();
  }
}
