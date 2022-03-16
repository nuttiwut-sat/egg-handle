import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizeService } from './authorize.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(public auth: AuthorizeService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    let user = this.auth.user$.value;

    if (user) {
      return true;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token');
      this.router.navigate(['login'], { replaceUrl: true });
      return false;
    }

    this.auth
      .getUserByToken()
      .toPromise()
      .then((user) => {
        if (user) {
          this.auth.user$.next(user);
          if (user.accessToken) {
            this.auth.setToken(user.accessToken);
          }
        }
      })
      .catch((err) => {
        localStorage.removeItem('token');
        this.router.navigate(['login'], { replaceUrl: true });
        return false;
      });
    return true;
  }
}
