import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Entity } from '../../administration/shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';
import { UserPostsService } from '../shared/services/user-posts/user-posts.service';
import { Post } from '../../posts/shared/models/post.interface';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-user-posts-list',
  templateUrl: './user-posts-list.component.html',
  styleUrls: ['./user-posts-list.component.scss'],
})
export class UserPostsListComponent implements OnInit {
  entityName = Entity.publication;
  page = 1;
  path = Path.posts;
  posts: Partial<Post>[] = [];
  // posts$: Observable<null|Post[]>;

  collectionSize = 0;
  pageParam = 1;

  private decodedToken: any;

  constructor(
    private readonly jwtHelper: JwtHelperService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userPostsService: UserPostsService,
  ) {
    // this.posts$ = this.userPostsService.posts$
  }

  async ngOnInit(): Promise<void> {
    this.subscribeToQueryParams();
    this.subscribeToRouter();

    await this.setDecodeToken();
    this.getPosts();
  }

  async setDecodeToken(): Promise<void> {
    const token = await this.jwtHelper.tokenGetter();
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  getPosts(): void {
    this.userPostsService
      .count<Response<number>>(`utilisateurs/${this.decodedToken?.pseudonyme}/publications/count`)
      .pipe(
        tap((res) => {
          this.collectionSize = res?.data || 0;
        }),
        switchMap((_) =>
          this.userPostsService.getAll<Response<Partial<Post>[]>>(
            `utilisateurs/${this.decodedToken?.pseudonyme}/publications?page=${this.pageParam}`,
          ),
        ),
        map((res) => {
          if (res?.data) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i] = {
                created_at: res.data[i].created_at,
                publication_id: res.data[i].publication_id,
                statut: res.data[i].statut,
                titre: res.data[i].titre,
                updated_at: res.data[i].updated_at,
              };
            }
          }

          return res?.data;
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.posts = data;
      });
  }

  // async onEdit(path: string, id: number): Promise<void> {
  //   // await this.router.navigateByUrl(`administration/${path}/${id}/edit`);
  // }
  //
  // async onDelete(id: number): Promise<void> {
  //   let hasUserValidated;
  //   try {
  //     hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
  //   } catch (_) {}
  //
  //   if (!hasUserValidated) {
  //     return;
  //   }
  //
  //   // TODO
  // }
  //

  onPageChange(page: number): void {
    this.pageParam = page;
    // TODO
    this.router.navigate(['users', 'posts'], { queryParams: { page } });
  }

  private subscribeToQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.pageParam = Number(params['page']) || 1;
    });
  }

  private subscribeToRouter(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd && e.url === '/login') {
        return;
      }

      console.log('subscribe to router');
      this.getPosts();
    });
  }
}
