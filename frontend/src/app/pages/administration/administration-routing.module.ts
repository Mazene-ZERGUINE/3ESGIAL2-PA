import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { AdministrationCategoriesListComponent } from './administration-categories-list/administration-categories-list.component';
import { AdministrationPostsListComponent } from './administration-posts-list/administration-posts-list.component';
import { AdministrationUsersListComponent } from './administration-users-list/administration-users-list.component';
import { AdministrationCategoryFormComponent } from './administration-category-form/administration-category-form.component';
import { AdministrationPostFormComponent } from './administration-post-form/administration-post-form.component';
import { AdministrationUserFormComponent } from './administration-user-form/administration-user-form.component';
import { AdministrationReportedUsersListComponent } from './administration-reported-users-list/administration-reported-users-list.component';
import { AdministrationReportedPostsListComponent } from './administration-reported-posts-list/administration-reported-posts-list.component';
import { AdministrationReportedUserFormComponent } from './administration-reported-user-form/administration-reported-user-form.component';
import { AdministrationReportedPostFormComponent } from './administration-reported-post-form/administration-reported-post-form.component';

const routes: Routes = [
  { path: '', component: AdministrationComponent },
  { path: 'categories', component: AdministrationCategoriesListComponent },
  { path: 'categories/add', component: AdministrationCategoryFormComponent },
  { path: 'categories/:id/edit', component: AdministrationCategoryFormComponent },
  { path: 'posts', component: AdministrationPostsListComponent },
  // { path: 'posts/add', component: AdministrationPostsListComponent },
  { path: 'posts/:id/edit', component: AdministrationPostFormComponent },
  { path: 'reported-users', component: AdministrationReportedUsersListComponent },
  { path: 'reported-users/add', component: AdministrationReportedUserFormComponent },
  { path: 'reported-users/:id/edit', component: AdministrationReportedUserFormComponent },
  { path: 'reported-posts', component: AdministrationReportedPostsListComponent },
  { path: 'reported-posts/add', component: AdministrationReportedPostFormComponent },
  { path: 'reported-posts/:id/edit', component: AdministrationReportedPostFormComponent },
  { path: 'users', component: AdministrationUsersListComponent },
  { path: 'users/add', component: AdministrationUserFormComponent },
  { path: 'users/:username/edit', component: AdministrationUserFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
