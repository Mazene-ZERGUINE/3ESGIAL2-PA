import { Component, OnInit } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Categorie, Post } from './shared/models/post.interface';
import { AuthService } from '../../shared/core/services/auth/auth.service';
import { PostsService } from './shared/services/posts/posts.service';
import { Response } from '../../shared/core/models/interfaces/response.interface';
import { PostLikesService } from '../../shared/core/services/post-likes/post-likes.service';
import { minLengthValidator } from '../../shared/utils/validator.utils';
import { PostFavoritesService } from '../../shared/core/services/post-favorites/post-favorites.service';
import { PostReportsService } from '../../shared/core/services/post-reports/post-reports.service';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  readonly isAuthenticated$: Observable<boolean>;
  readonly reportInfo$?: Observable<{ [key: string]: { reported: boolean } }>;
  readonly likeInfo$?: Observable<{ [key: string]: { count: number; liked: boolean } }>;
  readonly posts$: Observable<null | Post[]>;
  readonly starInfo$?: Observable<{ [key: string]: { starred: boolean } }>;

  categories: Categorie[] = [];
  collectionSize = 0;
  currentUserId?: number;
  filterForm?: FormGroup;
  form?: FormGroup;
  likeInfo: { [key: number]: { count: number; liked: boolean } } = {};
  reportInfo: { [key: string]: { reported: boolean } } = {};
  starInfo: { [key: string]: { starred: boolean } } = {};
  selectedPost?: Post;
  pageParam = 1;

  private canGetSearchedPosts = false;
  private searchTerms: string[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly jwtHelper: JwtHelperService,
    private readonly postFavoritesService: PostFavoritesService,
    private readonly postLikesService: PostLikesService,
    private readonly postsService: PostsService,
    private readonly postReportsService: PostReportsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly viewportScroller: ViewportScroller,
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.posts$ = this.postsService.posts$;
    this.likeInfo$ = this.postLikesService.likeInfo$;
    this.reportInfo$ = this.postReportsService.reportInfo$;
    this.starInfo$ = this.postFavoritesService.starInfo$;
  }

  async ngOnInit(): Promise<void> {
    this.subscribeToQueryParams();
    this.subscribeToRouter();

    await this.setCurrentUserId();
    this.getPosts();

    this.getCategories();
    this.initForm();
    this.initFilterForm();

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  getCategories() {
    this.postsService
      .getAll<Response<Categorie[]>>('categories')
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.categories = res.data;
      });
  }

  onFilterSubmit() {
    if (this.filterForm?.invalid) {
      return;
    }
    if (!this.filterForm || this.filterForm?.invalid) {
      return;
    }

    this.postsService
      .search<Response<{ count: number; rows: Post[] }>>(`publications/search?page=1`, {
        categorie_id: this.filterForm.get('categorie')?.value,
      })
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.collectionSize = data.count;
        this.postsService.emitPosts(data.rows);
      });
  }

  initFilterForm(): void {
    this.filterForm = this.fb.group({
      categorie: this.fb.control(0, [Validators.required, Validators.min(0)]),
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      recherche: this.fb.control('', [Validators.required, minLengthValidator]),
    });

    this.form
      .get('recherche')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((search) => {
          const isInputValid = typeof search === 'string' && Boolean(search.trim());
          if (!isInputValid) {
            this.canGetSearchedPosts = false;
            this.pageParam = 1;

            this.router.navigate(['posts'], { queryParams: { page: this.pageParam } }).then(() => {
              this.getPosts();
            });
          }

          return isInputValid;
        }),
        map((search) => String(search).trim().toLowerCase()),
        tap((term) => {
          this.searchTerms = term.split(' ');
          this.canGetSearchedPosts = true;
          this.pageParam = 1;
        }),
        switchMap((term) =>
          this.postsService.search<Response<{ count: number; rows: Post[] }>>(`publications/search?page=1`, {
            searches: term.split(' '),
          }),
        ),
        map((res) => res?.data),
      )
      .subscribe((data) => {
        this.collectionSize = data.count;
        this.postsService.emitPosts(data.rows);
      });
  }

  getPostsBySearch(terms: string[]): void {
    this.postsService
      .search<Response<{ count: number; rows: Post[] }>>(`publications/search?page=${this.pageParam}`, {
        searches: terms,
      })
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.postsService.emitPosts(data.rows);
      });
  }

  getPosts(): void {
    this.postsService
      .getAll<Response<{ count: number; rows: Post[] }>>(`publications/active?page=${this.pageParam}`)
      .pipe(
        map((res) => res?.data),
        tap((data) => {
          this.collectionSize = data.count || 0;
          this.postsService.emitPosts(data.rows);
        }),
        // concatMap((res) => {
        //   const posts = res?.data || [];
        //
        //   return from(posts).pipe(
        //     concatMap((post) => {
        //       publication_id = post.publication_id;
        //       return this.postLikesService.getByPostId<Response<{ count: number; liked: boolean }>>(
        //         'appreciations/publications',
        //         post.publication_id,
        //       );
        //     }),
        //   );
        // }),
        // tap((data) => {
        //   this.likeInfo[publication_id] = { count: data.data.count, liked: data.data.liked };
        // }),
        // concatMap((res) => {
        //   const posts = res?.data || [];
        //
        //   const observables = posts.map((post) => {
        //     publication_id = post.publication_id;
        //
        //     const postLikesRequest = this.postLikesService.getByPostId<Response<{ count: number; liked: boolean }>>(
        //       'appreciations/publications',
        //       publication_id,
        //     );
        //     const postFavoriteRequest = this.postFavoritesService.getOneById<Response<{ starred: boolean }>>(
        //       'favoris/publications',
        //       publication_id,
        //     );
        //
        //     return forkJoin([postLikesRequest, postFavoriteRequest]).pipe(
        //       tap(([likeInfos, favoriteInfos]) => {
        //         console.log(likeInfos, publication_id);
        //         this.likeInfo[publication_id] = {
        //           count: likeInfos.data.count,
        //           liked: likeInfos.data.liked,
        //         };
        //
        //         this.starInfo[publication_id] = {
        //           starred: favoriteInfos.data.starred,
        //         };
        //       }),
        //       untilDestroyed(this)
        //     );
        //   });
        //
        //   return forkJoin(observables);
        // }),
        mergeMap((data) => {
          const posts = data?.rows || [];

          const observables = posts.map((post) => {
            return zip(
              this.postLikesService.getByPostId<Response<{ count: number; liked: boolean }>>(
                'appreciations/publications',
                post.publication_id,
              ),
              this.postFavoritesService.getOneById<Response<{ starred: boolean }>>(
                'favoris/publications',
                post.publication_id,
              ),
              !this.currentUserId
                ? of({ data: { reported: false } })
                : this.postReportsService.getOneById<Response<{ reported: boolean }>>(
                    `publication-signalements/publications/${post.publication_id}/utilisateurs`,
                    this.currentUserId,
                  ),
            ).pipe(
              tap(([likeInfo, favoriteInfos, reportInfo]) => {
                const publicationId = post.publication_id;
                this.reportInfo[publicationId] = {
                  reported: reportInfo.data.reported,
                };

                this.likeInfo[publicationId] = {
                  count: likeInfo.data.count,
                  liked: likeInfo.data.liked,
                };

                this.starInfo[publicationId] = {
                  starred: favoriteInfos.data.starred,
                };
              }),
              untilDestroyed(this),
            );
          });

          return forkJoin(observables);
        }),
        catchError((err) => of(err)),
        untilDestroyed(this),
      )
      .subscribe((_) => {
        this.postLikesService.emitLikeInfo(this.likeInfo);
        this.postFavoritesService.emitStarInfo(this.starInfo);
        this.postReportsService.emitReportInfo(this.reportInfo);
      });
  }

  onPageChange(page: number): void {
    this.pageParam = page;

    this.router.navigate(['posts'], { queryParams: { page } });
  }

  selectPost(post: Post): void {
    this.postsService.emitSelectedPost(post);
  }

  private async setCurrentUserId() {
    this.currentUserId = await this.authService.getCurrentUserId();
  }

  private subscribeToQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.pageParam = Number(params['page']) || 1;
    });
  }

  private subscribeToRouter(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        untilDestroyed(this),
      )
      .subscribe((_) => {
        if (this.canGetSearchedPosts) {
          this.getPostsBySearch(this.searchTerms);
        } else {
          this.getPosts();
        }
      });
  }
}
