import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { frenchDepartments } from '../../sign-up/shared/data/french-departments';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { UserProfileService } from '../shared/services/user-profile/user-profile.service';
import { UserDTO } from '../../../shared/core/models/interfaces/user.interface';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { AuthService } from '../../../shared/core/services/auth/auth.service';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import {
  onlyLettersAndDashesAndSpacesRegex,
  startsWithLetterWhichContainsLetterAndNumbersRegex,
  startsWithLetterWhichContainsLettersAndSpacesAndApostrophesAndCannotEndWithSpacesApostrophesDashes,
  startsWithNumberWhichContainsLetterOrNumberRegex,
} from '../../../shared/utils/regex.utils';

@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  readonly passwordMinLength = 8;

  currentUserId?: number;
  form?: FormGroup;
  frenchDepartments = [...frenchDepartments] as const;

  private decodedToken: any;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly jwtHelper: JwtHelperService,
    private readonly modalService: NgbModal,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly userProfileService: UserProfileService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.setDecodeToken();
    this.getUserProfile();
    await this.setCurrentUserId();
  }

  getUserProfile() {
    this.userProfileService
      .getOneByField<Response<UserDTO>>('utilisateurs', this.decodedToken?.pseudonyme)
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.form?.setValue({
          nom: data?.nom,
          prenom: data?.prenom,
          email: data?.email,
          pseudonyme: data?.pseudonyme,
          ville: data?.ville,
          departement: data?.departement,
        });
      });
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

  async onDelete(path: string, id: number): Promise<void> {
    try {
      const hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
      if (!hasUserValidated) {
        return;
      }

      this.userProfileService
        .delete(path, id)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.authService.deleteToken();
          this.router.navigateByUrl('signup');
        });
    } catch (e) {}
  }

  onSubmit(): void {
    if (!this.form) {
      return;
    }
    if (this.form.invalid) {
      return;
    }

    const ville = this.form.get('ville')?.value.trim();
    const formattedVille = ville.charAt(0).toUpperCase() + ville.slice(1).toLowerCase();

    const payload: UserDTO = {
      ...this.form.value,
      ville: formattedVille,
    };

    this.userProfileService
      .updateByField('utilisateurs', this.decodedToken.pseudonyme, payload)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.authService.deleteToken();
        this.toastService.showSuccess('Profil modifié !');
        this.router.navigateByUrl('login');
      });
  }

  private async setCurrentUserId(): Promise<void> {
    this.currentUserId = await this.authService.getCurrentUserId();
  }

  private async setDecodeToken(): Promise<void> {
    const token = await this.jwtHelper.tokenGetter();
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
