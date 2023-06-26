import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthGuard implements CanLoad {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated();
  }

  private async isAuthenticated(): Promise<boolean> {
    if (this.authService.isAuthenticated) {
      await this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
}
