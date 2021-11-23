import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
import { ConfirmAuthenticationComponent } from './sign-up/confirm-authentication/confirm-authentication.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginPage,
    SignInComponent,
    SignUpComponent,
    ConfirmAuthenticationComponent,
  ],
})
export class LoginPageModule {}
