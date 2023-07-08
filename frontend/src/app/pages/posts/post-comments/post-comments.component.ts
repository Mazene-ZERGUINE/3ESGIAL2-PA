import { Component, Input } from '@angular/core';
import { PostCommentsService } from '../shared/services/post-comments/post-comments.service';
import { Comment } from '../shared/models/post.interface';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
})
export class PostCommentsComponent {
  @Input() publicationId?: number;
  @Input() currentUserId?: number;

  comments: Comment[] = [];

  constructor(private readonly postCommentsService: PostCommentsService) {}

  getComments() {
    if (!this.publicationId) return;
    // if (!this.currentPage || this.currentPage <= 0) return;

    this.postCommentsService
      .getOneByPublicationId<Response<{ count: number; rows: Comment[] }>>(
        'commentaires/publications',
        this.publicationId,
        1,
      )
      .pipe(
        // tap((_) => (this.isLoading = true)),
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        if (!data) return;

        this.comments = data.rows;
        // this.isLoading = false;
      });
  }
}
