import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ToastService } from '../../shared/components/toast/shared/toast.service';
import { AuthService } from '../../shared/core/services/auth/auth.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss'],
})
export class ForgottenPasswordComponent implements OnInit {
  form?: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    if (!this.form) {
      return;
    }
    if (this.form.invalid) {
      return;
    }

    this.authService
      .sendResetConfirmationMail(this.form.value)
      .pipe(
        catchError((err) => of(err)),
        untilDestroyed(this),
      )
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) {
          return;
        }

        this.form?.reset();
        this.toastService.showSuccess('Email envoyé !');
      });
  }
}
