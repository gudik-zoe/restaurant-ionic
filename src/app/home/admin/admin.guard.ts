import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/role';
import { AuthService } from '../client/login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    console.log("passing here")
      const role = await this.authService.getUserRole();
    if ( role === Role.admin.toLocaleLowerCase()) {
      console.log("it's an admin")
      return true;
    } else {
      console.log("it's not an  admin")
      this.router.navigate(['home/client/menu']);
    }
  }
}
