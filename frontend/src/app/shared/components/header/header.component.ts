import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  routes: ReadonlyArray<{ path: string; label: string }> = [
    { path: '/administration', label: 'Administration' },
    { path: '/', label: 'Objets' },
    { path: '/chat', label: 'Messagerie' },
    { path: '/users', label: 'Profil' },
    { path: '/', label: 'Déconnexion' },
  ];
}
