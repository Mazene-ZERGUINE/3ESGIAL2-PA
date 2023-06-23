import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './shared/core/services/auth/auth.service';
import { ToastService } from './shared/components/toast/shared/toast.service';
import { Role } from './pages/sign-up/shared/enums/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hideHeader = false;
  hideFooter = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  async ngOnInit() {
    // this.subscribeToRouterEvents();
    await this.setAuthentication();
  }

  private async setAuthentication() {
    let token: null | string | Promise<string>;

    try {
      token = await this.jwtHelper.tokenGetter();
      if (!token) {
        return;
      }
      if (await this.jwtHelper.isTokenExpired()) {
        this.authService.deleteToken();
        return;
      }

      this.authService.setToken(token);

      const role = await this.jwtHelper.decodeToken(token)?.role;
      this.authService.emitOnIsAdmin$(role === Role.admin);
    } catch (e) {
      this.toastService.showDanger('Une erreur est survenue. Veuillez rafraichir la page.');
    }
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => {
          return event instanceof NavigationEnd;
        }),
      )
      .subscribe(() => {
        this.hideHeader = this.activatedRoute.firstChild?.snapshot.data?.['hideHeader'] ?? false;
        this.hideFooter = this.activatedRoute.firstChild?.snapshot.data?.['hideFooter'] ?? false;
      });
  }
}
