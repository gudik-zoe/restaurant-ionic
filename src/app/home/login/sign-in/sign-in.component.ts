/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private formbuilder: FormBuilder) {}
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
    console.log(email + ' ' + password);
  }
  ngOnInit() {
    this.fillSignInForm();
  }
}
