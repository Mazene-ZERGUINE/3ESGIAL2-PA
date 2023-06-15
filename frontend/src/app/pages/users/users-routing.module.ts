import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserPostsListComponent } from './user-posts-list/user-posts-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { applicationTitle } from '../../shared/utils/app-title';
import { UserChatsListComponent } from './user-chats-list/user-chats-list.component';
import { UserChatComponent } from './user-chat/user-chat.component';

let combinedTitle = `| ${applicationTitle}`;
const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'chats',
        component: UserChatsListComponent,
        title: `Mes conversations ${combinedTitle}`,
      },
      {
        path: 'chats/:id',
        component: UserChatComponent,
        title: `Une conversation ${combinedTitle}`,
      },
      {
        path: 'posts',
        component: UserPostsListComponent,
        title: `Mes publications ${combinedTitle}`,
      },
      {
        path: 'profile/me',
        component: UserProfileComponent,
        title: `Mon profil ${combinedTitle}`,
      },
      {
        path: 'profile/:username',
        component: UserProfileDetailsComponent,
        title: `Un profil ${combinedTitle}`,
      },
      {
        path: '**',
        loadChildren: () => import('../../shared/pages/not-found/not-found.module').then((m) => m.NotFoundModule),
        title: `Page introuvable ${combinedTitle}`,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
