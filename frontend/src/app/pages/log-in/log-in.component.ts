import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

import { AuthService } from '../../shared/services/core/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  form?: FormGroup;

  constructor(private readonly authService: AuthService, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    this.logIn();
  }

  logIn(): void {
    // TODO
  }
}
