import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { frenchDepartments } from '../../sign-up/shared/data/french-departments';
import { Status } from '../../sign-up/shared/enums/status.enum';
import { Role } from '../../sign-up/shared/enums/role.enum';
import {
  onlyLettersRegex,
  startsWithLetterWhichContainsLetterAndNumbersRegex,
  startsWithNumberWhichContainsLetterOrNumberRegex,
} from '../../../shared/utils/regex.utils';
import { UserDTO } from '../../../shared/core/models/interfaces/user.interface';
import { SignUpService } from '../../sign-up/shared/sign-up.service';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';

@UntilDestroy()
@Component({
  selector: 'app-administration-user-form',
  templateUrl: './administration-user-form.component.html',
  styleUrls: ['./administration-user-form.component.scss'],
})
export class AdministrationUserFormComponent {
  isEditPage = false;
  form?: FormGroup;
  frenchDepartments = [...frenchDepartments] as const;
  readonly passwordMinLength = 8;
  roles: ReadonlyArray<Role> = Object.values(Role);
  statuses: ReadonlyArray<Status> = Object.values(Status);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly signUpService: SignUpService,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.setIsEditPage();
    this.isEditPage ? this.initEditForm() : this.initAddForm();
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
        this.toastService.showSuccess('Utilisateur créé !');
        this.router.navigateByUrl('administration/users');
      });
  }

  setIsEditPage(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.isEditPage = !Object.is(NaN, id) && id > 0;
  }
}
