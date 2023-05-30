import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from './shared/sign-up.service';

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form?: FormGroup;
  readonly passwordMinLength = 8;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly signUpService: SignUpService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const startsWithLetterAndContainsNumbers = /^[a-zA-Z][a-zA-Z0-9]*$/;

    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
      username: this.fb.control('', [Validators.required, Validators.pattern(startsWithLetterAndContainsNumbers)]),
    });
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    // TODO
  }
}
