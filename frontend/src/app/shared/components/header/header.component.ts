import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthService } from '../../core/services/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  readonly isAdmin: Observable<boolean>;
  readonly isAuthenticated: Observable<boolean>;

  backOfficeRoutes: ReadonlyArray<{ path: string; label: string; queryParams?: { page: number } }> = [
    { path: '/administration/categories', label: 'Catégories', queryParams: { page: 1 } },
    // { path: '/administration/categories/add', label: 'Catégories (ajout)' },
    { path: '/administration/posts', label: 'Publications', queryParams: { page: 1 } },
    // { path: '/administration/posts/add', label: 'Publications (ajout)', queryParams: {page: 1 },
    { path: '/administration/reported-posts/', label: 'Signalement publications', queryParams: { page: 1 } },
    { path: '/administration/reported-users', label: 'Signalement utilisateurs', queryParams: { page: 1 } },
    { path: '/administration/users', label: 'Utilisateurs', queryParams: { page: 1 } },
    // { path: '/administration/users/add', label: 'Utilisateurs (ajout)' },
  ];

  userRoutes: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/users/chats', label: 'Messagerie' },
    { path: '/users/profile/me', label: 'Profil' },
    { path: '/users/posts', label: 'Publications' },
  ];

  visitorRoutes: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/login', label: 'Connexion' },
    { path: '/signup', label: "S'inscrire" },
  ];

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.isAdmin = this.authService.isAdmin$;
    this.isAuthenticated = this.authService.isAuthenticated$;
  }

  async onSignupClick(): Promise<void> {
    await this.router.navigate(['signup']);
  }

  async onLoginClick(): Promise<void> {
    await this.router.navigate(['login']);
  }

  onLogoutClick(): void {
    this.authService
      .logOut()
      .pipe(first(), untilDestroyed(this))
      .subscribe(() => {
        this.authService.deleteToken();
        this.router.navigateByUrl('login');
      });
  }
}
