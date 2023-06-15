import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Status } from '../../sign-up/shared/enums/status.enum';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  canEdit = false;
  form?: FormGroup;
  filePath?: string;
  files?: File[] = [];

  readonly bmp = 'image/bmp';
  readonly jpg = 'image/jpg';
  readonly jpeg = 'image/jpeg';
  readonly png = 'image/png';
  readonly acceptedTypes = `${this.bmp}, ${this.jpg}, ${this.jpeg}, ${this.png}`;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.setCanEdit();
    this.canEdit ? this.initEditForm() : this.initAddForm();
  }

  get images(): FormArray {
    return this.form?.value.images as FormArray;
  }

  initAddForm(): void {
    this.form = this.fb.group({
      titre: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      images: this.fb.control([]),
    });
  }

  initEditForm(): void {
    this.form = this.fb.group({
      titre: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      images: this.fb.control([]),
    });

    const statut = Status.active;
  }

  onDelete(file: File): void {
    this.form!.value.images = this.form?.value.images.filter((image: File) => image.name !== file.name);
  }

  onFileInputChange(e: Event): void {
    if ((e.target as HTMLInputElement).files?.length === 0) {
      this.filePath = undefined;
      return;
    }

    const file = (e.target as HTMLInputElement).files![0];
    const isFileTypeValid =
      file.type === this.png || file.type === this.jpeg || file.type === this.jpg || file.type === this.bmp;
    if (!isFileTypeValid) {
      this.toastService.showDanger('Le champ doit contenir un fichier valide.');
      return;
    }
    if (file.size > 1024 * 1024) {
      this.toastService.showDanger('Le champ doit contenir un fichier de taille valide.');
      return;
    }
    if (this.form?.value.images.some((image: File) => image.name === file.name)) {
      this.toastService.showDanger("Erreur : l'image a déjà été ajoutée.");
      return;
    }

    this.form?.value.images.push(file);
  }

  onSubmit(): void {
    if (this.form?.invalid) {
      return;
    }

    // TODO
    console.log(this.form?.value);
  }

  setCanEdit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.canEdit = !Object.is(NaN, id) && id > 0;
  }
}
