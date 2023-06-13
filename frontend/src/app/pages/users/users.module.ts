import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserPostsListComponent } from './user-posts-list/user-posts-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, UserPostsListComponent, UserProfileComponent, UserProfileDetailsComponent],
  imports: [CommonModule, UsersRoutingModule, NgbPagination, ReactiveFormsModule],
})
export class UsersModule {}
