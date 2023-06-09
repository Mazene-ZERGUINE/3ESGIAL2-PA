import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselBasicComponent } from '../../shared/components/carousel-basic/carousel-basic.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { PostCommentFormComponent } from './post-comment-form/post-comment-form.component';
import { PostCommentsListComponent } from './post-comments-list/post-comments-list.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostDetailsComponent,
    PostsListComponent,
    PostFormComponent,
    PostCommentsComponent,
    PostCommentFormComponent,
    PostCommentsListComponent,
  ],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule, CarouselBasicComponent, NgbPagination],
})
export class PostsModule {}
