/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  signUpForm: FormGroup;

  fillSignUpForm() {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      }
      // { validator: [Custome.PasswordConfirmation, Custome.passwordPattern] }
    );
  }

  signUp() {
    if (!this.signUpForm.valid) {
      return;
    } else {
    }
  }

  ngOnInit() {
    this.fillSignUpForm();
  }
}
