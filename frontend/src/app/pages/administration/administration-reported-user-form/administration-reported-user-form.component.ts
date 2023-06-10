import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { minLengthValidator } from '../../../shared/utils/validator.utils';

@Component({
  selector: 'app-administration-reported-user-form',
  templateUrl: './administration-reported-user-form.component.html',
  styleUrls: ['./administration-reported-user-form.component.scss'],
})
export class AdministrationReportedUserFormComponent {
  form?: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      utilisateur_id: this.fb.control(undefined, [Validators.required, Validators.pattern(/\d+/), Validators.min(1)]),
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
