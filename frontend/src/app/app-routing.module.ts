import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { applicationTitle } from './shared/utils/app-title';

const combinedTitle = `| ${applicationTitle}`;
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'administration',
    loadChildren: () => import('./pages/administration/administration.module').then((m) => m.AdministrationModule),
    title: `Administration ${combinedTitle}`,
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/log-in/log-in.module').then((m) => m.LogInModule),
    // data: {
    //   hideHeader: true,
    //   hideFooter: true,
    // },
    title: `Connexion ${combinedTitle}`,
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
    // data: {
    //   hideHeader: true,
    //   hideFooter: true,
    // },
    title: `Inscription ${combinedTitle}`,
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
    title: `Utilisateurs ${combinedTitle}`,
  },
  {
    path: '**',
    loadChildren: () => import('./shared/pages/not-found/not-found.module').then((m) => m.NotFoundModule),
    title: `Page introuvable ${combinedTitle}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
