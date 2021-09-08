/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
      console.log(email + ' ' + password);
      return this.http.post(this.rootUrl + 'auth/login', { email, password });
    } catch (err) {
      console.log(err);
    }
  }

  public isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}