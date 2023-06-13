import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { minLengthValidator } from '../../../shared/utils/validator.utils';

@Component({
  selector: 'app-administration-category-form',
  templateUrl: './administration-category-form.component.html',
  styleUrls: ['./administration-category-form.component.scss'],
})
export class AdministrationCategoryFormComponent {
  canEdit = false;
  form?: FormGroup;

  constructor(private readonly route: ActivatedRoute, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.setCanEdit();
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      libelle: this.fb.control('', [Validators.required, minLengthValidator]),
    });
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    // TODO
  }

  setCanEdit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.canEdit = !Object.is(NaN, id) && id > 0;
  }
}
