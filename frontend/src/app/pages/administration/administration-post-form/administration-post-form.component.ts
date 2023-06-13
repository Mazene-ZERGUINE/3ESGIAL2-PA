import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Status } from '../../sign-up/shared/enums/status.enum';
import { minLengthValidator } from '../../../shared/utils/validator.utils';
import { onlyLettersRegex } from '../../../shared/utils/regex.utils';

@Component({
  selector: 'app-administration-post-form',
  templateUrl: './administration-post-form.component.html',
  styleUrls: ['./administration-post-form.component.scss'],
})
export class AdministrationPostFormComponent {
  form?: FormGroup;
  statuses: ReadonlyArray<Status> = Object.values(Status);

  constructor(private readonly route: ActivatedRoute, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initEditForm();
  }

  initEditForm(): void {
    this.form = this.fb.group({
      titre: this.fb.control('', [Validators.required, minLengthValidator]),
      description: this.fb.control('', [Validators.required, minLengthValidator]),
      statut: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      images: this.fb.array([]),
    });
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    // TODO
  }
}
