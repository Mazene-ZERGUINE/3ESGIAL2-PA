import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../shared/models/post.interface';
import { Router } from '@angular/router';
import { Status } from '../../sign-up/shared/enums/status.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PostLikesService } from '../../../shared/core/services/post-likes/post-likes.service';

@UntilDestroy()
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  readonly activeStatus = Status.active;

  @Input() currentUserId?: number;
  @Input() isAuthenticated: null | boolean = false;
  @Input() likeInfo: any = {};
  @Input() posts: null | Post[] = [];

  @Output() selected = new EventEmitter<Post>();
  @Output() liked = new EventEmitter<void>();
  @Output() disliked = new EventEmitter<void>();

  page = 1;

  constructor(
    public readonly sanitizer: DomSanitizer,
    private readonly postLikesService: PostLikesService,
    private readonly router: Router,
  ) {}

  onPageChange(a: any) {}
  // async onDislike(e: MouseEvent): Promise<void> {
  //   if (!this.isAuthenticated) {
  //     await this.router.navigateByUrl('/login');
  //     return
  //   }
  //
  //   this.stopPropagation(e);
  //   // TODO
  // }
  //
  // async onLike(e: MouseEvent): Promise<void> {
  //   if (!this.isAuthenticated) {
  //     await this.router.navigateByUrl('/login');
  //     return
  //   }
  //
  //
  //   // TODO
  // }
  async onLike(e: MouseEvent, postId: number, userId?: number): Promise<void> {
    this.stopPropagation(e);

    const isUnauthenticated = !this.isAuthenticated || !userId;
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    this.postLikesService
      .create(`appreciations/publications/${postId}/count`, { publication_id: postId })
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        // this.getByPostId(postId);
        this.liked.emit();
      });
  }

  async onDislike(e: MouseEvent, postId: number, userId?: number): Promise<void> {
    this.stopPropagation(e);

    const isUnauthenticated = !this.isAuthenticated || !userId;
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    this.postLikesService
      .deleteLike(`appreciations/publications`, postId)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        // this.getByPostId(postId);
        this.disliked.emit();
      });
  }

  async onReport(e: MouseEvent): Promise<void> {
    if (!this.isAuthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    this.stopPropagation(e);
    // TODO
  }

  onStar(e: MouseEvent): void {
    this.stopPropagation(e);
    // TODO
  }

  onUnstar(e: MouseEvent): void {
    this.stopPropagation(e);
    // TODO
  }

  selectPost(post: Post): void {
    this.selected.emit(post);
  }

  stopPropagation(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  trackById(index: number, post: Post) {
    return post.publication_id;
  }
}
