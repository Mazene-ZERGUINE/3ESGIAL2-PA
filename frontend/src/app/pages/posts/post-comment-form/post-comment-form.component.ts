import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { minLengthValidator } from '../../../shared/utils/validator.utils';
import { AuthService } from '../../../shared/core/services/auth/auth.service';
import { CommentDTO } from '../shared/models/post.interface';
import { PostsService } from '../shared/services/posts/posts.service';
import { ToastService } from 'src/app/shared/components/toast/shared/toast.service';

@UntilDestroy()
@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrls: ['./post-comment-form.component.scss'],
})
export class PostCommentFormComponent implements OnInit {
  @Input() publicationId?: number;
  @Input() currentUserId?: number;
  @Output() commented = new EventEmitter<void>();

  form?: FormGroup;
  isAuthenticated?: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly postsService: PostsService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.subscribeToIsAuthenticated();
    this.initForm();
  }

  subscribeToIsAuthenticated() {
    this.authService.isAuthenticated$
      .pipe(untilDestroyed(this))
      .subscribe((isAuthenticated) => (this.isAuthenticated = isAuthenticated));
  }

  initForm(): void {
    this.form = this.fb.group({
      commentaire: this.fb.control('', [Validators.required, minLengthValidator]),
    });
  }

  onTextAreaClick(): void {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // TODO
  }

  onSubmit(): void {
    if (!this.form) {
      return;
    }
    if (this.form.invalid) {
      return;
    }

    const payload: CommentDTO = {
      commentaire: this.form.get('commentaire')?.value,
      utilisateur_id: this.currentUserId ?? 0,
      publication_id: this.publicationId ?? 0,
      created_at: new Date(),
      update_at: null,
    };

    // TODO
    this.postsService
      .create(`commentaires/publications/${this.publicationId}`, payload)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.commented.emit();
        this.toastService.showSuccess('Commentaire envoyé !');
        this.form?.reset();
      });
  }
}
