import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = !false;

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

  initialRoutes: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/posts/add', label: 'Publier' },
    { path: '/chat', label: 'Messagerie' },
    { path: '/users', label: 'Profil' },
  ];

  visitorRoutes: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/login', label: 'Connexion' },
    { path: '/signup', label: "S'inscrire" },
  ];

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  onSignupClick(): void {
    this._router.navigate(['signup']);
  }

  onLoginClick(): void {
    this._router.navigate(['login']);
  }

  /**
   * TODO
   */
  onLogoutClick(): void {
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
