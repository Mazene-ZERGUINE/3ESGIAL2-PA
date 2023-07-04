import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ToastService } from '../../shared/components/toast/shared/toast.service';
import { AuthService } from '../../shared/core/services/auth/auth.service';

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
    // private readonly signUpService: SignUpService,
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
      .sendMailWithPassword(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.toastService.showSuccess('Email envoyé !');
      });
  }
}
