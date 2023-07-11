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
  statusRegex,
} from '../../../shared/utils/regex.utils';
import { User, UserDTO } from '../../../shared/core/models/interfaces/user.interface';
import { SignUpService } from '../../sign-up/shared/sign-up.service';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { AdministrationUsersService } from '../shared/services/administration-users/administration-users.service';
import { catchError, map, of } from 'rxjs';
import { Response } from '../../../shared/core/models/interfaces/response.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-user-form',
  templateUrl: './administration-user-form.component.html',
  styleUrls: ['./administration-user-form.component.scss'],
})
export class AdministrationUserFormComponent {
  readonly passwordMinLength = 8;

  isEditPage = false;
  form?: FormGroup;
  frenchDepartments = [...frenchDepartments] as const;
  roles: ReadonlyArray<Role> = Object.values(Role);
  statuses: ReadonlyArray<Status> = Object.values(Status);
  usernameParam: string;

  constructor(
    private readonly administrationUsersService: AdministrationUsersService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly signUpService: SignUpService,
    private readonly toastService: ToastService,
  ) {
    this.usernameParam = this.route.snapshot.paramMap.get('username') || '';
  }

  async ngOnInit(): Promise<void> {
    await this.setIsEditPage();

    if (this.isEditPage) {
      this.initEditForm();
      this.getUser(this.usernameParam);
    } else {
      this.initAddForm();
    }
  }

  getUser(username: string) {
    this.administrationUsersService
      .getOneByField<Response<User>>('utilisateurs', username)
      .pipe(
        map((res) => res?.data),
        catchError((_) => of(null)),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        if (!data) {
          this.router.navigate(['administration', 'users'], { queryParams: { page: 1 } });
          return;
        }

        this.form?.patchValue({
          nom: data?.nom,
          prenom: data?.prenom,
          email: data?.email,
          // mot_de_passe: data?.mot_de_passe,
          pseudonyme: data?.pseudonyme,
          ville: data?.ville,
          departement: data?.departement,
          role: data?.role,
          statut: data?.statut,
        });
      });
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
      statut: this.fb.control('', [Validators.required, Validators.pattern(statusRegex)]),
    });
  }

  initEditForm(): void {
    this.form = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      prenom: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      // mot_de_passe: this.fb.control('', [Validators.required, Validators.minLength(this.passwordMinLength)]),
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
      statut: this.fb.control('', [Validators.required, Validators.pattern(statusRegex)]),
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

    if (this.isEditPage) {
      this.administrationUsersService
        .updatePutByField('utilisateurs', this.usernameParam, payload)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.router.navigate(['administration', 'users'], { queryParams: { page: 1 } });
          this.toastService.showSuccess('Utilisateur modifié !');
        });
    } else {
      this.signUpService
        .create('utilisateurs', payload)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.toastService.showSuccess('Utilisateur créé !');
          this.router.navigateByUrl('administration/users');
        });
    }
  }

  async setIsEditPage(): Promise<void> {
    const usernameParam = this.route.snapshot.paramMap.get('username');
    if (!usernameParam) {
      return;
    }

    const isUsernameParamValid = startsWithLetterWhichContainsLetterAndNumbersRegex.test(usernameParam);
    if (!isUsernameParamValid) {
      this.toastService.showDanger('La ressource demandée est incorrecte.');
      await this.router.navigate(['administration', 'users'], { queryParams: { page: 1 } });
      return;
    }

    this.usernameParam = usernameParam;
    this.isEditPage = isUsernameParamValid;
  }
}
