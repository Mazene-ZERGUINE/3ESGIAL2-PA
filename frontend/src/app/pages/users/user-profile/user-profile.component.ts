import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { frenchDepartments } from '../../sign-up/shared/data/french-departments';
import { SignUpService } from '../../sign-up/shared/sign-up.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  form?: FormGroup;
  frenchDepartments = [...frenchDepartments] as const;
  readonly passwordMinLength = 8;

  constructor(
    private readonly fb: FormBuilder,
    private readonly modalService: NgbModal,
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
      password2: this.fb.control('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
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
