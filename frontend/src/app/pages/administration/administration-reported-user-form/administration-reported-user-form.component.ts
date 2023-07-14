import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

import { minLengthValidator } from '../../../shared/utils/validator.utils';
import { UserReport, UserReportDTO } from '../../../shared/core/models/interfaces/user-report.interface';
import { UserReportStatus } from '../../../shared/core/models/interfaces/UserReportStatus.enum';
import { reportStatusRegex } from '../../../shared/utils/regex.utils';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { UserReportsService } from '../../users/shared/services/user-reports/user-reports.service';
import { Response } from '../../../shared/core/models/interfaces/response.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-reported-user-form',
  templateUrl: './administration-reported-user-form.component.html',
  styleUrls: ['./administration-reported-user-form.component.scss'],
})
export class AdministrationReportedUserFormComponent {
  form?: FormGroup;
  idParam = 0;
  isIdParamValid = false;
  statuses: ReadonlyArray<UserReportStatus> = Object.values(UserReportStatus);
  userReport?: UserReport;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly userReportsService: UserReportsService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setIsIdParamValid();
    if (!this.isIdParamValid) {
      return;
    }
    this.initForm();
    this.getUserReport();
  }

  getUserReport() {
    this.userReportsService
      .getOneById<Response<any>>('utilisateur-signalements', this.idParam)
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.form?.patchValue({
          description: data.description,
          statut: data.statut,
        });
        console.log(data);
        this.userReport = data;
      });
  }

  initForm(): void {
    this.form = this.fb.group({
      description: this.fb.control('', [Validators.required, minLengthValidator]),
      statut: this.fb.control('', [Validators.required, Validators.pattern(reportStatusRegex)]),
    });
  }

  onSubmit(userReport?: UserReport): void {
    if (!this.form) {
      return;
    }
    if (this.form.invalid) {
      return;
    }
    if (!userReport) {
      return;
    }
    const payload: UserReportDTO = {
      signale_id: userReport.signale_id || 0,
      signaleur_id: userReport.signaleur_id || 0,
      description: this.form.get('description')?.value,
      statut: this.form.get('statut')?.value,
      created_at: userReport.created_at,
      updated_at: new Date(),
    };

    this.userReportsService
      .updatePutById('utilisateur-signalements', this.idParam, payload)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.router.navigate(['administration', 'reported-users'], { queryParams: { page: 1 } });
      });
  }

  private async setIsIdParamValid(): Promise<void> {
    let idParam: null | string | number = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    idParam = Number(this.route.snapshot.paramMap.get('id'));
    const isIdParamValid = !Object.is(NaN, idParam) && idParam > 0;
    if (!isIdParamValid) {
      this.toastService.showDanger('La ressource demandée est incorrecte.');
      await this.router.navigate(['administration', 'reported-users'], { queryParams: { page: 1 } });
      return;
    }

    this.idParam = idParam;
    this.isIdParamValid = isIdParamValid;
  }
}
