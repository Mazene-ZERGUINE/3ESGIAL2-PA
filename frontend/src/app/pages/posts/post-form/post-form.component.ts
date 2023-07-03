import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Status } from '../../sign-up/shared/enums/status.enum';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { PostsService } from '../shared/services/posts/posts.service';
import { CategoriesService } from '../../../shared/core/services/categories/categories.service';
import { Categorie, Post } from '../shared/models/post.interface';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, of } from 'rxjs';
import { HttpError } from '../../../shared/core/enums/http-error.enums';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../sign-up/shared/enums/role.enum';
import { onlyLettersRegex } from '../../../shared/utils/regex.utils';

@UntilDestroy()
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  isEditPage = false;
  categories: Categorie[] = [];
  form?: FormGroup;
  filePath?: string;
  files?: File[] = [];
  idParam = 0;
  decodedToken?: any;
  statuses: ReadonlyArray<Status> = Object.values(Status);

  private removedFiles: any[] = [];

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

  async ngOnInit(): Promise<void> {
    this.getCategories();
    await this.setIsEditPage();
    await this.setDecodedToken();

    if (!this.isEditPage) {
      this.initAddForm();
    } else {
      this.getPostById();
      this.initEditForm();
    }
  }

  getPostById() {
    this.postsService
      .getOneById<Response<Post>>('publications', this.idParam)
      .pipe(
        map((res) => res?.data),
        map((data) => {
          const canEdit = data.utilisateur_id == this.decodedToken.utilisateur_id || this.decodedToken === Role.admin;
          if (!canEdit) {
            return null;
          }

          return data;
        }),
        catchError((err, caught) => {
          if (err.status === HttpError['404NotFound']) {
            this.router.navigateByUrl('not-found', { skipLocationChange: true });
          }

          return of(err);
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        if (!data) {
          this.router.navigate(['posts'], { queryParams: { page: 1 } });
          this.toastService.showDanger("Vous n'êtes pas autorisé.");
          return;
        }

        if (data instanceof HttpErrorResponse) {
          return;
        }

        const images: any[] = [];
        for (const image of data?.images) {
          images.push({ name: image.libelle });
        }

        this.form?.patchValue({
          titre: data?.titre,
          description: data?.description,
          images: images,
          categorie: data?.categorie_id,
          statut: data?.statut,
        });
      });
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
      statut: this.fb.control('', [Validators.required, Validators.pattern(onlyLettersRegex)]),
      images: this.fb.control([]),
      categorie: this.fb.control(0, [Validators.required, Validators.min(1)]),
    });
  }

  onDelete(file: File): void {
    this.removedFiles = [...this.removedFiles, file];
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

  onSubmit(): void {
    if (!this.form || this.form?.invalid) {
      return;
    }

    const { utilisateur_id } = this.decodedToken;

    const formData = new FormData();
    formData.append('titre', this.form.get('titre')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('statut', !this.isEditPage ? Status.active : this.form.get('statut')?.value);
    formData.append('utilisateur_id', String(utilisateur_id));
    formData.append('categorie_id', this.form.get('categorie')?.value);

    const images = this.images;
    if (Array.isArray(images)) {
      images.forEach((image, i) => {
        formData?.append('images', image);
      });
    }

    for (const removedFile of this.removedFiles) {
      formData?.append('removed_files', removedFile.name);
    }

    if (this.isEditPage) {
      this.postsService
        .updatePutById('publications', this.idParam, formData)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.router.navigateByUrl(`posts/${this.idParam}`);
          this.toastService.showSuccess('Publication modifiée !');
        });
    } else {
      this.postsService
        .create('publications', formData)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          // this.router.navigate(['posts'], { queryParams: { page: 1 } });
          location.href = '/posts';
          this.toastService.showSuccess('Publication créée !');
        });
    }
  }

  private async setDecodedToken(): Promise<void> {
    const token = await this.jwtHelper.tokenGetter();
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  private async setIsEditPage(): Promise<void> {
    let idParam: null | string | number = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    idParam = Number(this.route.snapshot.paramMap.get('id'));
    const isIdParamValid = !Object.is(NaN, idParam) && idParam > 0;
    if (!isIdParamValid) {
      this.toastService.showDanger('La ressource demandée est incorrecte.');
      await this.router.navigate(['users', 'posts'], { queryParams: { page: 1 } });
      return;
    }

    this.idParam = idParam;
    this.isEditPage = isIdParamValid;
  }
}
