import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  canEdit = false;
  form?: FormGroup;

  constructor(private readonly route: ActivatedRoute, private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.setCanEdit();
    this.canEdit ? this.initEditForm() : this.initAddForm();
  }

  initAddForm(): void {
    const startsWithLetterAndContainsNumbers = /^[a-zA-Z][a-zA-Z0-9]*$/;

    this.form = this.fb.group({
      titre: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      images: this.fb.array([]),
    });
  }

  initEditForm(): void {
    this.form = this.fb.group({
      titre: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      images: this.fb.array([]),
    });

    const statut = 'actif'; // TODO
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
