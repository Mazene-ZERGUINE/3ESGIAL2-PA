import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from './shared/sign-up.service';
import { frenchDepartments } from './shared/data/french-departments';
import {
  onlyLettersAndDashesAndSpacesRegex,
  onlyLettersRegex,
  startsWithLetterWhichContainsLetterAndNumbersRegex,
  startsWithLetterWhichContainsLettersAndSpacesAndApostrophesAndCannotEndWithSpacesApostrophesDashes,
  startsWithNumberWhichContainsLetterOrNumberRegex,
} from '../../shared/utils/regex.utils';
import { Role } from './shared/enums/role.enum';
import { Status } from './shared/enums/status.enum';
import { UserDTO } from '../../shared/core/models/interfaces/user.interface';
import { ToastService } from '../../shared/components/toast/shared/toast.service';

@UntilDestroy()
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  readonly passwordMinLength = 8;

  form?: FormGroup;
  frenchDepartments = [...frenchDepartments] as const;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly signUpService: SignUpService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      nom: this.fb.control('', [
        Validators.required,
        Validators.pattern(
          startsWithLetterWhichContainsLettersAndSpacesAndApostrophesAndCannotEndWithSpacesApostrophesDashes,
        ),
      ]),
      prenom: this.fb.control('', [
        Validators.required,
        Validators.pattern(
          startsWithLetterWhichContainsLettersAndSpacesAndApostrophesAndCannotEndWithSpacesApostrophesDashes,
        ),
      ]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      mot_de_passe: this.fb.control('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
      pseudonyme: this.fb.control('', [
        Validators.required,
        Validators.pattern(startsWithLetterWhichContainsLetterAndNumbersRegex),
      ]),
      ville: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersAndDashesAndSpacesRegex)]),
      departement: this.fb.control('', [
        Validators.required,
        Validators.pattern(startsWithNumberWhichContainsLetterOrNumberRegex),
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

    let formattedVille = '';
    const ville = this.form.get('ville')?.value.trim();
    if (ville) {
      formattedVille = ville.charAt(0).toUpperCase() + ville.slice(1).toLowerCase();
    }

    const role = Role.utilisateur;
    const statut = Status.active;
    const payload: UserDTO = {
      ...this.form.value,
      ville: formattedVille,
      role,
      statut,
    };

    this.signUpService
      .create('utilisateurs', payload)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.router.navigateByUrl('/login');
        this.toastService.showSuccess('Inscription réussie !');
      });
  }
}
