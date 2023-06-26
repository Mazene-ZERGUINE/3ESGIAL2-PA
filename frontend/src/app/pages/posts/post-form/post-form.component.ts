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
import { catchError, map, of, tap } from 'rxjs';
import { HttpError } from '../../../shared/core/enums/http-error.enums';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../sign-up/shared/enums/role.enum';

@UntilDestroy()
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  isEditPage = false;
  categories?: Categorie[];
  form?: FormGroup;
  filePath?: string;
  files?: File[] = [];
  id = 0;
  decodedToken?: any;

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
    this.setIsEditPage();
    await this.setDecodedToken();

    if (!this.isEditPage) {
      this.initAddForm();
    } else {
      this.getPostById();
      this.initEditForm();
    }
  }

  getPostById() {
    // this.router.navigateByUrl("not-found")

    this.postsService
      .getOneById<Response<Post>>('publications', this.id)
      .pipe(
        map((res) => res?.data),
        map((data) => {
          // {pseudonyme: 'b', utilisateur_id: 2, role: 'utilisateur', iat: 1687763160}
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
        console.log('sub', data);
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
      images: this.fb.control([]),
      categorie: this.fb.control(0, [Validators.required, Validators.min(1)]),
    });

    const statut = Status.active;
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

  async setDecodedToken(): Promise<void> {
    const token = await this.jwtHelper.tokenGetter();
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  onSubmit(): void {
    if (!this.form || this.form?.invalid) {
      return;
    }

    const { utilisateur_id } = this.decodedToken;

    const formData = new FormData();
    formData.append('titre', this.form.get('titre')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('statut', Status.active);
    formData.append('utilisateur_id', String(utilisateur_id));
    formData.append('categorie_id', this.form.get('categorie')?.value);

    const images = this.images;
    if (Array.isArray(images)) {
      images.forEach((image, i) => {
        console.log('images', image);
        formData?.append('images', image);
      });
    }

    console.log('removedfiles', this.removedFiles);
    for (const removedFile of this.removedFiles) {
      // console.log("removedf",removedFile);
      formData?.append('removed_files', removedFile.name);
    }

    // formData?.append("removed_files", )

    // console.log(JSON.stringify(formData.get("removed_files")));
    // console.log(formData.getAll("removed_files"));

    if (this.isEditPage) {
      this.postsService
        .updateById('publications', this.id, formData)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          // this.router.navigate(['posts'], { queryParams: { page: 1 } });
          // location.href = '/posts';
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

  private setIsEditPage(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.isEditPage = !Object.is(NaN, this.id) && this.id > 0;
  }
}
