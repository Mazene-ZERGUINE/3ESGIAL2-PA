import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { AdministrationCategoriesListComponent } from './administration-categories-list/administration-categories-list.component';
import { AdministrationPostsListComponent } from './administration-posts-list/administration-posts-list.component';
import { AdministrationUsersListComponent } from './administration-users-list/administration-users-list.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../shared/components/components.module';
import { AdministrationReportedUsersListComponent } from './administration-reported-users-list/administration-reported-users-list.component';
import { AdministrationReportedPostsListComponent } from './administration-reported-posts-list/administration-reported-posts-list.component';
import { AdministrationTableComponent } from './administration-table/administration-table.component';
import { AdministrationPostFormComponent } from './administration-post-form/administration-post-form.component';
import { AdministrationCategoryFormComponent } from './administration-category-form/administration-category-form.component';
import { AdministrationReportedPostFormComponent } from './administration-reported-post-form/administration-reported-post-form.component';
import { AdministrationReportedUserFormComponent } from './administration-reported-user-form/administration-reported-user-form.component';
import { AdministrationUserFormComponent } from './administration-user-form/administration-user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministrationCategoriesTableComponent } from './administration-categories-table/administration-categories-table.component';
import { AdministrationPostsTableComponent } from './administration-posts-table/administration-posts-table.component';
import { AdministrationUsersTableComponent } from './administration-users-table/administration-users-table.component';
import { AdministrationReportedPostsTableComponent } from './administration-reported-posts-table/administration-reported-posts-table.component';
import { AdministrationReportedUsersTableComponent } from './administration-reported-users-table/administration-reported-users-table.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    AdministrationCategoriesListComponent,
    AdministrationUsersListComponent,
    AdministrationPostsListComponent,
    AdministrationReportedUsersListComponent,
    AdministrationReportedPostsListComponent,
    AdministrationTableComponent,
    AdministrationPostFormComponent,
    AdministrationCategoryFormComponent,
    AdministrationReportedPostFormComponent,
    AdministrationReportedUserFormComponent,
    AdministrationUserFormComponent,
    AdministrationCategoriesTableComponent,
    AdministrationPostsTableComponent,
    AdministrationUsersTableComponent,
    AdministrationReportedPostsTableComponent,
    AdministrationReportedUsersTableComponent,
  ],
  imports: [CommonModule, AdministrationRoutingModule, NgbPagination, ComponentsModule, ReactiveFormsModule],
})
export class AdministrationModule {}
