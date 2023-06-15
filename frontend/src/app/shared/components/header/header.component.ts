import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = true;

  backOfficeRoutes: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/administration/categories', label: 'Catégories' },
    { path: '/administration/categories/add', label: 'Catégories (ajout)' },
    { path: '/administration/posts', label: 'Publications' },
    // { path: '/administration/posts/add', label: 'Publications (ajout)' },
    { path: '/administration/reported-users', label: 'Signalement utilisateurs' },
    { path: '/administration/reported-posts/', label: 'Signalement publications' },
    { path: '/administration/users', label: 'Utilisateurs' },
    { path: '/administration/users/add', label: 'Utilisateurs (ajout)' },
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

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  async onSignupClick(): Promise<void> {
    await this._router.navigate(['signup']);
  }

  async onLoginClick(): Promise<void> {
    await this._router.navigate(['login']);
  }

  /**
   * TODO
   */
  onLogoutClick(): void {
    this.isAuthenticated = false;
    // this.authService.logout();
  }

  /**
   * TODO
   */
  private checkAuthentication(): void {
    // this.authService
    //   .getAuthenticated$()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((value) => (this.isAuthenticated = value));
  }
}
