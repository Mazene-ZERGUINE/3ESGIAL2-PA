import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, first, Observable, of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthService } from '../../core/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly isAdmin: Observable<boolean>;
  readonly isAuthenticated: Observable<boolean>;
  readonly username$: Observable<string>;

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

  userRoutes: ReadonlyArray<{ path: string; label: string; queryParams?: { page: number } }> = [
    { path: '/users/chats', label: 'Messagerie' },
    { path: '/users/favorites', label: 'Favoris', queryParams: { page: 1 } },
    { path: '/users/profile/me', label: 'Profil' },
    { path: '/users/posts', label: 'Publications', queryParams: { page: 1 } },
  ];

  visitorRoutes: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/login', label: 'Connexion' },
    { path: '/signup', label: "S'inscrire" },
  ];

  username = '';

  constructor(
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService,
    private readonly router: Router,
  ) {
    this.isAdmin = this.authService.isAdmin$;
    this.isAuthenticated = this.authService.isAuthenticated$;
    this.username$ = this.authService.username$;
  }

  async ngOnInit(): Promise<void> {
    // await this.setUsername();
  }

  async setUsername() {
    const token = await this.jwtHelper.tokenGetter();
    const decodedToken = this.jwtHelper.decodeToken(token);

    this.username = decodedToken?.pseudonyme;
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
      .pipe(
        first(),
        catchError((err) => of(err)),
        untilDestroyed(this),
      )
      .subscribe((_) => {
        this.authService.deleteToken();
        this.router.navigateByUrl('login');
      });
  }
}
