import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'administration',
    loadChildren: () => import('./pages/administration/administration.module').then((m) => m.AdministrationModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/log-in/log-in.module').then((m) => m.LogInModule),
    data: {
      hideHeader: true,
      hideFooter: true,
    },
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
    data: {
      hideHeader: true,
      hideFooter: true,
    },
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    loadChildren: () => import('./shared/pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
