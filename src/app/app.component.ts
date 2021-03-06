import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './home/client/login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private route: Router, private authService: AuthService) {}

  logOut() {
    this.authService.userSignedIn.next(false);
    localStorage.removeItem('token');
    this.route.navigate(['home/client/login']);
  }
}
