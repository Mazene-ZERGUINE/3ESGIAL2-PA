import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { PostsService } from '../shared/services/posts/posts.service';
import { Post } from '../shared/models/post.interface';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { ModalReportComponent } from '../../../shared/components/modal-report/modal-report.component';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { AuthService } from '../../../shared/core/services/auth/auth.service';
import { PostLikesService } from '../../../shared/core/services/post-likes/post-likes.service';

@UntilDestroy()
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  readonly postId: number;
  readonly isIdInvalid: boolean;

  currentUserId?: number;
  isAuthenticated: boolean;
  likeInfo?: { count: number; liked: boolean };
  post?: Post;

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly modalService: NgbModal,
    private readonly postLikesService: PostLikesService,
    private readonly postsService: PostsService,
    private readonly router: Router,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.isIdInvalid = isNaN(this.postId) || this.postId <= 0;
  }

  async ngOnInit(): Promise<void> {
    if (this.isIdInvalid) {
      await this.router.navigateByUrl('/not-found', { skipLocationChange: true });
      return;
    }

    this.subscribeToSelectedPost$();

    await this.setCurrentUserId();
    this.getByPostId(this.postId);
  }

  getByPostId(postId: number): void {
    this.postLikesService
      .getByPostId<Response<{ count: number; liked: boolean }>>(`appreciations/publications`, postId)
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.likeInfo = { count: data.count, liked: data.liked };
        this.postLikesService.emitCurrentCountPost(data.count);
      });
  }

  async onDelete(): Promise<void> {
    let hasUserValidated;
    try {
      hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
    } catch (_) {}

    if (!hasUserValidated) {
      return;
    }

    // TODO
  }

  async onEdit(id: number): Promise<void> {
    await this.router.navigateByUrl(`posts/${id}/edit`);
  }

  async onLike(postId: number, userId?: number): Promise<void> {
    const isUnauthenticated = !this.isAuthenticated || !userId;
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    this.postLikesService
      .create(`appreciations/publications/${postId}/count`, { publication_id: postId })
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.getByPostId(postId);
      });
  }

  async onDislike(postId: number, userId?: number): Promise<void> {
    const isUnauthenticated = !this.isAuthenticated || !userId;
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    this.postLikesService
      .deleteLike(`appreciations/publications`, postId)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.getByPostId(postId);
      });
  }

  async onReport(): Promise<void> {
    if (!this.isAuthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    try {
      const description = await this.modalService.open(ModalReportComponent).result;
      console.log(description);
      // TODO
    } catch (_) {}
  }

  onStar(): void {
    // TODO
  }

  onUnstar(): void {
    // TODO
  }

  private subscribeToSelectedPost$(): void {
    this.postsService.selectedPost$
      .pipe(
        switchMap((data) => {
          if (data) {
            return of({ data });
          }

          const isIdInvalid = isNaN(this.postId) || this.postId <= 0;
          if (isIdInvalid) {
            return of(null);
          }

          return this.postsService.getOneById<Response<Post>>('publications', this.postId);
        }),
        map((res) => res?.data),
        catchError((err) => {
          this.router.navigateByUrl('/not-found', { skipLocationChange: true });
          return of(err);
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.post = data;
      });
  }

  private async setCurrentUserId(): Promise<void> {
    this.currentUserId = await this.authService.getCurrentUserId();
  }

  ngOnDestroy(): void {
    this.postsService.emitSelectedPost(null);
  }
}
