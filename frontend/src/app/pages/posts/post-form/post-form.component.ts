import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Status } from '../../sign-up/shared/enums/status.enum';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { PostsService } from '../shared/services/posts/posts.service';
import { CategoriesService } from '../../../shared/core/services/categories/categories.service';
import { Categorie } from '../shared/models/post.interface';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@UntilDestroy()
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  canEdit = false;
  categories?: Categorie[];
  form?: FormGroup;
  filePath?: string;
  files?: File[] = [];

  readonly bmp = 'image/bmp';
  readonly jpg = 'image/jpg';
  readonly jpeg = 'image/jpeg';
  readonly png = 'image/png';
  readonly acceptedTypes = `${this.bmp}, ${this.jpg}, ${this.jpeg}, ${this.png}`;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly elementRef: ElementRef,
    private readonly fb: FormBuilder,
    private readonly jwtHelper: JwtHelperService,
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  get images(): File[] {
    return this.form?.value.images as File[];
  }

  ngOnInit(): void {
    this.getCategories();
    this.setCanEdit();
    this.canEdit ? this.initEditForm() : this.initAddForm();
  }

  getCategories() {
    this.categoriesService
      .getAll<Response<Categorie[]>>('categories')
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.categories = res.data;
      });
  }

  initAddForm(): void {
    this.form = this.fb.group({
      titre: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      images: this.fb.control([]),
      categorie: this.fb.control(0, [Validators.required, Validators.min(1)]),
    });
  }

  initEditForm(): void {
    this.form = this.fb.group({
      titre: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      images: this.fb.control([]),
      categorie: this.fb.control(0, [Validators.required, Validators.min(1)]),
    });

    const statut = Status.active;
  }

  onDelete(file: File): void {
    this.form!.value.images = this.images.filter((image) => image.name !== file.name);
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

  async onSubmit(): Promise<void> {
    if (!this.form || this.form?.invalid) {
      return;
    }

    const token = await this.jwtHelper.tokenGetter();
    const { utilisateur_id } = this.jwtHelper.decodeToken(token);

    const formData = new FormData();
    formData.append('titre', this.form.get('titre')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('statut', Status.active);
    formData.append('utilisateur_id', String(utilisateur_id));
    formData.append('categorie_id', this.form.get('categorie')?.value);

    const images = this.images;
    if (Array.isArray(images)) {
      images.forEach((image, i) => {
        formData?.append('images', image);
      });
    }

    this.postsService
      .create('publications', formData)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.router.navigateByUrl('/');
        this.toastService.showSuccess('Publication créée !');
      });
  }

  setCanEdit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.canEdit = !Object.is(NaN, id) && id > 0;
  }
}
