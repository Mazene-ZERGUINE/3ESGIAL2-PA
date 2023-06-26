import { Component, OnInit } from '@angular/core';
import { catchError, concatMap, filter, from, Observable, of, switchMap, tap } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Post } from './shared/models/post.interface';
import { AuthService } from '../../shared/core/services/auth/auth.service';
import { PostsService } from './shared/services/posts/posts.service';
import { Response } from '../../shared/core/models/interfaces/response.interface';
import { PostLikesService } from '../../shared/core/services/post-likes/post-likes.service';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  readonly isAuthenticated$: Observable<boolean>;
  readonly likeInfo$?: Observable<{ [key: string]: { count: number; liked: boolean } }>;
  readonly posts$: Observable<null | Post[]>;

  currentUserId?: number;
  likeInfo: { [key: number]: { count: number; liked: boolean } } = {};
  selectedPost?: Post;
  pageParam = 1;
  collectionSize = 0;

  constructor(
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService,
    private readonly postLikesService: PostLikesService,
    private readonly postsService: PostsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly viewportScroller: ViewportScroller,
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.posts$ = this.postsService.posts$;
    this.likeInfo$ = this.postLikesService.likeInfo$;
  }

  async ngOnInit(): Promise<void> {
    this.subscribeToQueryParams();
    this.subscribeToRouter();

    await this.setCurrentUserId();
    this.getPosts();

    this.viewportScroller.scrollToPosition([0, 0]);
  }

  getPosts(): void {
    let publication_id: number;

    this.postsService
      .count<Response<number>>('publications/count/all')
      .pipe(
        tap((res) => {
          this.collectionSize = res?.data || 0;
        }),
        switchMap((_) => this.postsService.getAll<Response<Post[]>>(`publications?page=${this.pageParam}`)),
        tap((res) => {
          this.postsService.emitPosts(res.data);
        }),
        concatMap((res) => {
          const posts = res?.data || [];

          return from(posts).pipe(
            concatMap((post) => {
              publication_id = post.publication_id;
              return this.postLikesService.getByPostId('appreciations/publications', post.publication_id);
            }),
          );
        }),
        tap((data: any) => {
          this.likeInfo[publication_id] = { count: data.data.count, liked: data.data.liked };
        }),
        catchError((err) => of(err)),
        untilDestroyed(this),
      )
      .subscribe((_) => {
        this.postLikesService.emitLikeInfo(this.likeInfo);
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
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((_) => {
      this.getPosts();
    });
  }
}
