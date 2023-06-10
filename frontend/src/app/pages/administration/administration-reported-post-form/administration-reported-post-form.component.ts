import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { minLengthValidator } from '../../../shared/utils/validator.utils';

@Component({
  selector: 'app-administration-reported-post-form',
  templateUrl: './administration-reported-post-form.component.html',
  styleUrls: ['./administration-reported-post-form.component.scss'],
})
export class AdministrationReportedPostFormComponent {
  form?: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      publication_id: this.fb.control(undefined, [Validators.required, Validators.pattern(/\d+/), Validators.min(1)]),
      description: this.fb.control('', [Validators.required, minLengthValidator]),
    });
  }

  onSubmit(): void {
    if (this.form && this.form.invalid) {
      return;
    }

    // TODO
    // + find identifiant
  }
}
