import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Post } from '../shared/models/post.interface';
import { Status } from '../../sign-up/shared/enums/status.enum';
import { PostLikesService } from '../../../shared/core/services/post-likes/post-likes.service';
import { PostFavoritesService } from '../../../shared/core/services/post-favorites/post-favorites.service';
import { PostReportsService } from '../../../shared/core/services/post-reports/post-reports.service';
import { ModalReportComponent } from '../../../shared/components/modal-report/modal-report.component';
import { AuthService } from '../../../shared/core/services/auth/auth.service';
import { PostReportStatus } from '../../../shared/core/enums/PostReportStatus.enum';
import { PostReportDTO } from '../../../shared/core/models/interfaces/post-report.interface';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { Observable } from 'rxjs';

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
  @Input() reportInfo: any = {};
  @Input() likeInfo: any = {};
  @Input() posts: null | Post[] = [];
  @Input() starInfo: any = {};

  @Output() selected = new EventEmitter<Post>();
  @Output() liked = new EventEmitter<void>();
  @Output() disliked = new EventEmitter<void>();
  @Output() starred = new EventEmitter<void>();
  @Output() unstarred = new EventEmitter<void>();

  constructor(
    public readonly sanitizer: DomSanitizer,
    private readonly authService: AuthService,
    private readonly modalService: NgbModal,
    private readonly postFavoritesService: PostFavoritesService,
    private readonly postLikesService: PostLikesService,
    private readonly postReportsService: PostReportsService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

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

  async onReport(e: MouseEvent, post: Post): Promise<void> {
    this.stopPropagation(e);

    const currentUserId = await this.authService.getCurrentUserId();
    const isUnauthenticated = !this.isAuthenticated || !currentUserId;
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    try {
      const description = await this.modalService.open(ModalReportComponent).result;

      const payload: PostReportDTO = {
        publication_id: post.publication_id,
        utilisateur_id: currentUserId,
        description,
        statut: PostReportStatus.open,
      };

      this.postReportsService
        .create('publication-signalements', payload)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.toastService.showSuccess('Publication signalée !');
        });
    } catch (_) {}
  }

  async onStar(e: MouseEvent, postId: number, userId?: number): Promise<void> {
    this.stopPropagation(e);

    const isUnauthenticated = !this.isAuthenticated || !userId;
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    this.postFavoritesService
      .create(`favoris/publications/${postId}`, null)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.starred.emit();
      });
  }

  async onUnstar(e: MouseEvent, postId: number, userId?: number): Promise<void> {
    this.stopPropagation(e);

    const isUnauthenticated = !this.isAuthenticated || !userId;
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    this.postFavoritesService
      .delete('favoris/publications', postId)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.unstarred.emit();
      });
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
