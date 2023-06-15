import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsComponent } from './posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostFormComponent } from './post-form/post-form.component';
import { applicationTitle } from '../../shared/utils/app-title';

const combinedTitle = `| ${applicationTitle}`;
const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'posts/add',
    component: PostFormComponent,
    title: `Ajout de publication ${combinedTitle}`,
  },
  {
    path: 'posts/:id/edit',
    component: PostFormComponent,
    title: `Edition de publication ${combinedTitle}`,
  },
  {
    path: 'posts/:id',
    component: PostDetailsComponent,
    title: `Détails de publication ${combinedTitle}`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
