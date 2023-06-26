import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthService } from '../../shared/core/services/auth/auth.service';
import { Role } from '../sign-up/shared/enums/role.enum';

@UntilDestroy()
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  form?: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      mot_de_passe: this.fb.control('', Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.form || this.form?.invalid) {
      return;
    }

    this.logIn(this.form);
  }

  logIn(form: FormGroup): void {
    this.authService
      .logIn(form.value)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.authService.setToken(res.access_token);
        this.router.navigateByUrl('/');
      });
  }
}
