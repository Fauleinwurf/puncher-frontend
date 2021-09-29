import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from "./services/authentication.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = this.authenticationService.currentUserValue;
    return new Promise((resolve, reject) => {
      if (!currentUser) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return reject(false);
      }
      return resolve(true);
    });
  }
}
