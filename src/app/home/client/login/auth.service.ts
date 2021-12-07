/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ConfirmAuth } from 'src/app/models/confirmauth';
import { SignUp } from 'src/app/models/signup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // public isAuthenticated = new BehaviorSubject<boolean>(null);
  rootUrl: string = environment.rootUrl;
  userSignedIn = new Subject<boolean>();

  public login(email: string, password: string) {
    try {
      return this.http.post(this.rootUrl + 'auth/login', { email, password });
    } catch (err) {
      console.log(err);
    }
  }

  public signUp(SignUpForm: SignUp) {
    return new Promise<any>((resolve, reject) => {
      return this.http
        .post(this.rootUrl + 'auth/authenticateUser', SignUpForm)
        .subscribe(
          (data: any) => {
            if (data) {
              resolve(data);
            }
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
    });
  }

  public confirmUserByTemporaryPassword(confirmAuth: ConfirmAuth) {
    return new Promise<any>((resolve, reject) => {
      return this.http
        .post(this.rootUrl + 'auth/confirmauthentication', confirmAuth)
        .subscribe(
          (data: any) => {
            if (data.token) {
              resolve(data.token);
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  public isAuthenticated() {
    return !!localStorage.getItem('token');
  }
  getUserRole() {
    const decoded: any = jwt_decode(localStorage.getItem('token'));
    return decoded.role;
  }
}
