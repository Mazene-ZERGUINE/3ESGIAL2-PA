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
        loadChildren: () => import('./../items/items.module').then((m) => m.ItemsModule),
        title: `Objets ${combinedTitle}`,
      },
      {
        path: 'chat',
        loadChildren: () => import('./../chat/chat.module').then((m) => m.ChatModule),
        title: `Messagerie ${combinedTitle}`,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
