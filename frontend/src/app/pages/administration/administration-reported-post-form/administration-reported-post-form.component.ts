import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';

import { minLengthValidator } from '../../../shared/utils/validator.utils';
import { reportStatusRegex } from '../../../shared/utils/regex.utils';
import { ReportStatus } from '../../sign-up/shared/enums/report-status.enum';
import { PostReportsService } from '../../../shared/core/services/post-reports/post-reports.service';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { PostReport, PostReportDTO } from '../../../shared/core/models/interfaces/post-report.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-reported-post-form',
  templateUrl: './administration-reported-post-form.component.html',
  styleUrls: ['./administration-reported-post-form.component.scss'],
})
export class AdministrationReportedPostFormComponent {
  form?: FormGroup;
  idParam = 0;
  isIdParamValid = false;
  statuses: ReadonlyArray<ReportStatus> = Object.values(ReportStatus);
  postReport?: PostReport;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly postReportsService: PostReportsService,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setIsIdParamValid();
    if (!this.isIdParamValid) {
      return;
    }
    this.initForm();
    this.getPostReport();
  }

  getPostReport() {
    this.postReportsService
      .getOneById<Response<any>>('publication-signalements', 1)
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.form?.patchValue({
          description: data.description,
          statut: data.statut,
        });

        this.postReport = data;
      });
  }

  initForm(): void {
    this.form = this.fb.group({
      description: this.fb.control('', [Validators.required, minLengthValidator]),
      statut: this.fb.control('', [Validators.required, Validators.pattern(reportStatusRegex)]),
    });
  }

  onSubmit(): void {
    if (!this.form) {
      return;
    }
    if (this.form.invalid) {
      return;
    }

    const payload: PostReportDTO = {
      publication_id: this.postReport?.publication_id ?? 0,
      description: this.form.get('description')?.value,
      statut: this.form.get('statut')?.value,
      utilisateur_id: this.postReport?.utilisateur_id ?? 0,
    };

    this.postReportsService
      .updatePutById('publication-signalements', this.idParam, payload)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.router.navigate(['administration', 'reported-posts'], { queryParams: { page: 1 } });
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
      await this.router.navigate(['administration', 'reported-posts'], { queryParams: { page: 1 } });
      return;
    }

    this.idParam = idParam;
    this.isIdParamValid = isIdParamValid;
  }
}
