import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';

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
  id = 0;
  isEditPage = false;
  form?: FormGroup;

  constructor(
    private readonly administrationCategoriesService: AdministrationCategoriesService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.setIsEditPage();

    if (this.isEditPage) {
      this.getCategoryById();
    }

    this.initForm();
  }

  getCategoryById() {
    this.administrationCategoriesService
      .getOneById<Response<Categorie>>('categories', this.id)
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
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
        .updateById('categories', this.id, this.form.value)
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

  setIsEditPage(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.isEditPage = !Object.is(NaN, this.id) && this.id > 0;
  }
}
