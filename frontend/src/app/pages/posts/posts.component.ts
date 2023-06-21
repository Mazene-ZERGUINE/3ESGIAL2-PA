import { Component, OnInit } from '@angular/core';
import { Post } from './shared/models/post.interface';
import { Observable, of } from 'rxjs';
import { Status } from '../sign-up/shared/enums/status.enum';
import { ViewportScroller } from '@angular/common';
import { AuthService } from '../../shared/core/services/auth/auth.service';
import { PostsService } from './shared/services/posts/posts.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Response } from '../../shared/core/models/interfaces/response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  readonly isAuthenticated$: Observable<boolean>;
  readonly posts$: Observable<null | Post[]>;

  page = 1;
  selectedPost?: Post;
  currentUserId?: number;

  constructor(
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService,
    private readonly postsService: PostsService,
    private readonly viewportScroller: ViewportScroller,
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.posts$ = this.postsService.posts$;
  }

  async ngOnInit(): Promise<void> {
    await this.setCurrentUserId();
    this.viewportScroller.scrollToPosition([0, 0]);
    this.getPosts();
  }

  /**
   * TODO
   */
  getPosts(): void {
    // const arr = [];
    // for (let i = 1; i <= 21; i++) {
    //   const obj: Post = {
    //     publication_id: i + 1,
    //     titre: `titre ${i}`,
    //     description: `description ${i}`,
    //     statut: Status.active,
    //     utilisateur_id: 3,
    //     images: [
    //       {
    //         image_id: 1,
    //         libelle: 'libelle 1',
    //         lien: 'lien 1',
    //         publication_id: 1,
    //       },
    //       {
    //         image_id: 2,
    //         libelle: 'libelle 2',
    //         lien: 'lien 2',
    //         publication_id: 2,
    //       },
    //       {
    //         image_id: 3,
    //         libelle: 'libelle 3',
    //         lien: 'lien 3',
    //         publication_id: 3,
    //       },
    //     ],
    //   };
    //
    //   arr.push(obj);
    // }
    //
    // arr.push({
    //   publication_id: arr.length + 1,
    //   titre: `titre ${arr.length + 1}`,
    //   description: `description ${arr.length + 1}`,
    //   statut: Status.active,
    //   utilisateur_id: 3,
    //   images: [],
    // });
    // arr.push({
    //   publication_id: arr.length + 1,
    //   titre: `titre ${arr.length + 1}`,
    //   description: `description ${arr.length + 1}`,
    //   statut: Status.inactive,
    //   utilisateur_id: 3,
    //   images: [],
    // });
    //
    // this.posts$ = of(arr);

    this.postsService
      .getAll<Response<Post[]>>('publications')
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.postsService.emitPosts(res.data);
      });
  }

  onPageChange(page: number): void {
    this.page = page;
    // TODO
  }

  selectPost(post: Post): void {
    this.postsService.emitSelectedPost(post);
  }

  private async setCurrentUserId() {
    this.currentUserId = await this.authService.getCurrentUserId();
  }
}
