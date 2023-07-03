import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, map, of } from 'rxjs';

import { minLengthValidator } from '../../../shared/utils/validator.utils';
import { AdministrationCategoriesService } from '../shared/services/administration-categories/administration-categories.service';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { Categorie } from '../../posts/shared/models/post.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-category-form',
  templateUrl: './administration-category-form.component.html',
  styleUrls: ['./administration-category-form.component.scss'],
})
export class AdministrationCategoryFormComponent {
  idParam = 0;
  isEditPage = false;
  form?: FormGroup;

  constructor(
    private readonly administrationCategoriesService: AdministrationCategoriesService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setIsEditPage();

    if (this.isEditPage) {
      this.getCategoryById();
    }

    this.initForm();
  }

  getCategoryById() {
    this.administrationCategoriesService
      .getOneById<Response<Categorie>>('categories', this.idParam)
      .pipe(
        map((res) => res?.data),
        catchError((_) => {
          return of(null);
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        if (!data) {
          this.router.navigate(['administration', 'categories'], { queryParams: { page: 1 } });
          return;
        }

        this.form?.setValue({ libelle: data?.libelle });
      });
  }

  initForm(): void {
    this.form = this.fb.group({
      libelle: this.fb.control('', [Validators.required, minLengthValidator]),
    });
  }

  onSubmit(): void {
    if (!this.form || this.form?.invalid) {
      return;
    }

    if (this.isEditPage) {
      this.administrationCategoriesService
        .updatePutById('categories', this.idParam, this.form.value)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.router.navigate(['administration', 'categories'], { queryParams: { page: 1 } });
          this.toastService.showSuccess('Catégorie modifiée !');
        });
    } else {
      this.administrationCategoriesService
        .create('categories', this.form?.value)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.router.navigate(['administration', 'categories'], { queryParams: { page: 1 } });
          this.toastService.showSuccess('Catégorie ajoutée !');
        });
    }
  }

  async setIsEditPage(): Promise<void> {
    let idParam: null | string | number = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    idParam = Number(this.route.snapshot.paramMap.get('id'));
    const isIdParamValid = !Object.is(NaN, idParam) && idParam > 0;
    if (!isIdParamValid) {
      this.toastService.showDanger('La ressource demandée est incorrecte.');
      await this.router.navigate(['administration', 'users'], { queryParams: { page: 1 } });
      return;
    }

    this.idParam = idParam;
    this.isEditPage = isIdParamValid;
  }
}
