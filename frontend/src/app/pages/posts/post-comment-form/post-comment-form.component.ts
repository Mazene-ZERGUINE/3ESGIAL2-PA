import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { minLengthValidator } from '../../../shared/utils/validator.utils';
import { AuthService } from '../../../shared/core/services/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrls: ['./post-comment-form.component.scss'],
})
export class PostCommentFormComponent implements OnInit {
  form?: FormGroup;
  isAuthenticated?: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
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
      comment: this.fb.control('', [Validators.required, minLengthValidator]),
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
    if (this.form && this.form.invalid) {
      return;
    }

    // TODO
  }
}
