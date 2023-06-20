import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, map, of, switchMap } from 'rxjs';

import { PostsService } from '../shared/services/posts/posts.service';
import { Post } from '../shared/models/post.interface';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { ModalReportComponent } from '../../../shared/components/modal-report/modal-report.component';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { AuthService } from '../../../shared/core/services/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  currentUserId?: undefined | number;
  post?: Post;

  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly modalService: NgbModal,
    private readonly postsService: PostsService,
    private readonly router: Router,
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscribeToSelectedPost$();

    await this.setCurrentUserId();
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

  async onReport(): Promise<void> {
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

          const id = Number(this.route.snapshot.paramMap.get('id'));
          const isIdInvalid = isNaN(id) || id <= 0;
          if (isIdInvalid) {
            return of(null);
          }

          return this.postsService.getOneById<Response<Post>>('publications', id);
        }),
        map((res) => {
          return res?.data;
        }),
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

  private async setCurrentUserId() {
    this.currentUserId = await this.authService.getCurrentUserId();
  }

  ngOnDestroy() {
    this.postsService.emitSelectedPost(null);
  }
}
