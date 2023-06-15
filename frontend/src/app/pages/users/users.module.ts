import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserPostsListComponent } from './user-posts-list/user-posts-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../shared/components/components.module';
import { UserTableComponent } from './user-table/user-table.component';
import { UserChatsListComponent } from './user-chats-list/user-chats-list.component';
import { UserChatComponent } from './user-chat/user-chat.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserPostsListComponent,
    UserProfileComponent,
    UserProfileDetailsComponent,
    UserTableComponent,
    UserChatsListComponent,
    UserChatComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, NgbPagination, ReactiveFormsModule, ComponentsModule],
})
export class UsersModule {}
