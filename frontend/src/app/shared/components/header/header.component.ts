import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = !false;

  initialRoutes: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/administration', label: 'Administration' },
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
