import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { applicationTitle } from './shared/utils/app-title';
import { AuthGuard } from './shared/core/guards/auth/auth.guard';
import { UnauthGuard } from './shared/core/guards/unauth/unauth.guard';
import { AdminGuard } from './shared/core/guards/admin/admin.guard';

const combinedTitle = `| ${applicationTitle}`;
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'administration',
    canLoad: [AuthGuard, AdminGuard],
    loadChildren: () => import('./pages/administration/administration.module').then((m) => m.AdministrationModule),
    title: `Administration ${combinedTitle}`,
  },
  {
    path: 'forgotten-password',
    canLoad: [UnauthGuard],
    loadChildren: () =>
      import('./pages/forgotten-password/forgotten-password.module').then((m) => m.ForgottenPasswordModule),
    title: `Mot de passe oublié ${combinedTitle}`,
  },
  {
    path: 'login',
    canLoad: [UnauthGuard],
    loadChildren: () => import('./pages/log-in/log-in.module').then((m) => m.LogInModule),
    // data: {
    //   hideHeader: true,
    //   hideFooter: true,
    // },
    title: `Connexion ${combinedTitle}`,
  },
  {
    path: 'signup',
    canLoad: [UnauthGuard],
    loadChildren: () => import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
    // data: {
    //   hideHeader: true,
    //   hideFooter: true,
    // },
    title: `Inscription ${combinedTitle}`,
  },
  {
    path: 'users',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
    title: `Utilisateurs ${combinedTitle}`,
  },
  {
    path: 'not-found',
    loadChildren: () => import('./shared/pages/not-found/not-found.module').then((m) => m.NotFoundModule),
    title: `Page introuvable ${combinedTitle}`,
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
