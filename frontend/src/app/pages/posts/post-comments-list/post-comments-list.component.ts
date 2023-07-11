import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { Path } from '../../../shared/enum/path.enum';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { Comment, CommentDTO } from '../shared/models/post.interface';
import { PostCommentsService } from '../shared/services/post-comments/post-comments.service';
import { AuthService } from 'src/app/shared/core/services/auth/auth.service';
import { Role } from '../../sign-up/shared/enums/role.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minLengthValidator } from '../../../shared/utils/validator.utils';
import { ToastService } from 'src/app/shared/components/toast/shared/toast.service';

@UntilDestroy()
@Component({
  selector: 'app-post-comments-list',
  templateUrl: './post-comments-list.component.html',
  styleUrls: ['./post-comments-list.component.scss'],
})
export class PostCommentsListComponent implements OnInit, OnDestroy {
  @ViewChild('commentsContainer') commentsContainerRef?: ElementRef;

  @Input() publicationId?: number;
  @Input() comments: Comment[] = [];

  commentForm?: FormGroup;
  // comments: Comment[] = [];
  decodedToken: any;
  isLoading = false;
  isUserAdmin = false;
  currentPage = 1;
  usersPath = Path.users;
  currentUserId?: number;

  currentEditableCommentId?: number;
  isEditMode = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const documentHeight = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const modifierPixel = 100; // px from the bottom

    const hasReachedBottomPage: boolean = currentScroll + modifierPixel > documentHeight;
    if (hasReachedBottomPage) {
      this.loadMoreComments();
    }
  }

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal,
    private readonly postCommentsService: PostCommentsService,
    private readonly toastService: ToastService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscribeToCurrentPage$();
    this.getComments();

    await this.setUserInfo();
    this.initCommentForm();
  }

  async setUserInfo() {
    this.decodedToken = await this.authService.getDecodedToken();
    if (!this.decodedToken) {
      return;
    }

    this.isUserAdmin = this.decodedToken.role === Role.admin;
    this.currentUserId = this.decodedToken.utilisateur_id;
  }

  subscribeToCurrentPage$() {
    this.postCommentsService.currentPage$.pipe(untilDestroyed(this)).subscribe((page) => {
      this.currentPage = page;
    });
  }

  getComments() {
    if (!this.publicationId) return;
    if (!this.currentPage || this.currentPage <= 0) return;

    this.postCommentsService
      .getOneByPublicationId<Response<{ count: number; rows: Comment[] }>>(
        'commentaires/publications',
        this.publicationId,
        // this.currentPage,
      )
      .pipe(
        tap((_) => (this.isLoading = true)),
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        if (!data) return;

        this.comments = [...this.comments, ...data.rows];
        this.isLoading = false;
      });
  }

  initCommentForm() {
    this.commentForm = this.fb.group({
      commentaire: this.fb.control('', [Validators.required, minLengthValidator]),
    });
  }

  loadMoreComments(): void {
    this.currentPage++;
    this.getComments();
  }

  onCancelEditMode(): void {
    this.isEditMode = false;
  }

  async onDelete(id: number): Promise<void> {
    try {
      const hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
      if (!hasUserValidated) {
        return;
      }

      this.postCommentsService
        .delete('commentaires', id)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.toastService.showSuccess('Commentaire supprimé !');
          this.reloadComments();
        });
    } catch (e) {}
  }

  async onEdit(id: number, comment: string): Promise<void> {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) return;

    this.currentEditableCommentId = id;
    this.commentForm?.patchValue({ commentaire: comment });
  }

  onSubmit(comment: Comment) {
    if (!this.commentForm) return;
    if (this.commentForm.invalid) return;
    if (this.commentForm.get('commentaire')?.value === comment.commentaire) {
      this.onCancelEditMode();
      return;
    }

    const payload: CommentDTO = {
      commentaire: this.commentForm.get('commentaire')?.value,
      publication_id: comment.publication_id,
      utilisateur_id: comment.utilisateur_id,
      created_at: comment.created_at,
      update_at: new Date(),
    };

    this.postCommentsService
      .updatePutById('commentaires', comment.commentaire_id, payload)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.reloadComments();
        this.toastService.showSuccess('Commentaire modifié !');
      });
  }

  reloadComments() {
    this.onCancelEditMode();
    this.postCommentsService.resetCurrentPage();
    this.comments = [];
    this.currentPage++;
    this.getComments();
  }

  trackById(index: number, comment: Comment) {
    return comment.commentaire_id;
  }

  ngOnDestroy(): void {
    this.postCommentsService.resetCurrentPage();
  }
}
