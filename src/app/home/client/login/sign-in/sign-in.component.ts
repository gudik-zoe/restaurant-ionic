/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LoginResponse } from 'src/app/models/loginResponse';
import { Role } from 'src/app/models/role';
import { ErrorHandlerService } from 'src/app/utility/error-handler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}
  signInForm: FormGroup;
  showPassword: boolean;

  fillSignInForm() {
    this.signInForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  showThePassword() {
    this.showPassword = !this.showPassword;
  }

  login(email: string, password: string) {
    if (!this.signInForm.valid) {
      return;
    }
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'loggin in' })
      .then((loadingEl) => {
        loadingEl.present();
        this.authService
          .login(this.signInForm.value.email, this.signInForm.value.password)
          .subscribe(
            (loginResponse: LoginResponse) => {
              if (loginResponse) {
                localStorage.setItem('token', loginResponse.token);
                console.log(this.authService.getUserRole());
                if (loginResponse.role.toUpperCase() === Role.user) {
                  this.authService.userSignedIn.next(true);
                  loadingEl.dismiss();
                  this.router.navigate(['/home/client/menu']);
                } else {
                  loadingEl.dismiss();
                  this.router.navigate(['/home/admin/orders']);
                  console.log('here');
                }
              }
            },
            (error) => {
              loadingEl.dismiss();
              this.errorHandler.showError(
                error,
                'error signing in ',
                'home/login'
              );
            }
          );
      });
  }
  ngOnInit() {
    this.fillSignInForm();
  }
}
