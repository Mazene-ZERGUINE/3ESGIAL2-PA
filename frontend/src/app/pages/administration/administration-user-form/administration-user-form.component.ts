import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { frenchDepartments } from '../../sign-up/shared/data/french-departments';
import { Status } from '../../sign-up/shared/enums/status.enum';
import { Role } from '../../sign-up/shared/enums/role.enum';
import {
  onlyLettersRegex,
  startsWithLetterWhichContainsLetterAndNumbersRegex,
  startsWithNumberWhichContainsLetterOrNumberRegex,
} from '../../../shared/utils/regex.utils';

@Component({
  selector: 'app-administration-user-form',
  templateUrl: './administration-user-form.component.html',
  styleUrls: ['./administration-user-form.component.scss'],
})
export class AdministrationUserFormComponent {
  canEdit = false;
  form?: FormGroup;
  frenchDepartments = [...frenchDepartments] as const;
  readonly passwordMinLength = 8;
  roles: ReadonlyArray<Role> = Object.values(Role);
  statuses: ReadonlyArray<Status> = Object.values(Status);

  constructor(private readonly route: ActivatedRoute, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.setCanEdit();
    this.canEdit ? this.initEditForm() : this.initAddForm();
  }

  initAddForm(): void {
    this.form = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      prenom: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      mot_de_passe: this.fb.control('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
      pseudonyme: this.fb.control('', [
        Validators.required,
        Validators.pattern(startsWithLetterWhichContainsLetterAndNumbersRegex),
      ]),
      ville: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      departement: this.fb.control('', [
        Validators.required,
        Validators.pattern(startsWithNumberWhichContainsLetterOrNumberRegex),
      ]),
      role: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      statut: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
    });
  }

  initEditForm(): void {
    this.form = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      prenom: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      mot_de_passe: this.fb.control('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
      pseudonyme: this.fb.control('', [
        Validators.required,
        Validators.pattern(startsWithLetterWhichContainsLetterAndNumbersRegex),
      ]),
      ville: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      departement: this.fb.control('', [
        Validators.required,
        Validators.pattern(startsWithNumberWhichContainsLetterOrNumberRegex),
      ]),
      role: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      statut: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
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

  setCanEdit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.canEdit = !Object.is(NaN, id) && id > 0;
  }
}
