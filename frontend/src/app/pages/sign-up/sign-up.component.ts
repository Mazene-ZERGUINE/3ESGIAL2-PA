import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from './shared/sign-up.service';
import { frenchDepartments } from './shared/data/french-departments';

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form?: FormGroup;
  frenchDepartments = [...frenchDepartments] as const;
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
    const onlyLettersRegex = /^[a-zA-Z]+$/;
    const startsWithLetterWhichContainsLetterAndNumbers = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const startsWithNumberWhichContainsLetterOrNumber = /^[0-9][A-Z0-9]+$/;

    this.form = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      prenom: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
      pseudonyme: this.fb.control('', [
        Validators.required,
        Validators.pattern(startsWithLetterWhichContainsLetterAndNumbers),
      ]),
      ville: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      departement: this.fb.control('', [
        Validators.required,
        Validators.pattern(startsWithNumberWhichContainsLetterOrNumber),
      ]),
    });
  }

  onSubmit(): void {
    if (!this.form) {
      return;
    }
    if (this.form.invalid) {
      return;
    }

    let formattedVille: string;
    const ville = this.form.get('ville')?.value.trim();
    if (ville) {
      formattedVille = ville.charAt(0).toUpperCase() + ville.slice(1).toLowerCase();
    }

    // TODO
  }
}
