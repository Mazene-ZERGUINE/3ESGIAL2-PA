import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { applicationTitle } from '../../shared/utils/app-title';

const combinedTitle = `| ${applicationTitle}`;
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./../posts/posts.module').then((m) => m.PostsModule),
        title: `Accueil ${combinedTitle}`,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
