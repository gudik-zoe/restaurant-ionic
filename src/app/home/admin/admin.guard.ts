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
      const role = await this.authService.getUserRole();
    if ( role === Role.admin.toLocaleLowerCase()) {
      return true;
    } else {
      this.router.navigate(['home/client/menu']);
    }
  }
}
