import { Component } from '@angular/core';
import { filter, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AdministrationPostsService } from '../shared/services/administration-posts/administration-posts.service';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { Post } from '../../posts/shared/models/post.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-posts-list',
  templateUrl: './administration-posts-list.component.html',
  styleUrls: ['./administration-posts-list.component.scss'],
})
export class AdministrationPostsListComponent {
  collectionSize = 0;
  posts: Post[] = [];
  entityName = Entity.publication;
  pageParam = 1;
  path = Path.posts;

  constructor(
    private readonly administrationPostsService: AdministrationPostsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.subscribeToRouter();
    this.subscribeToQueryParams();

    this.getPosts();
  }

  getPosts() {
    this.administrationPostsService
      .count<Response<number>>('publications/count/all')
      .pipe(
        tap((res) => {
          this.collectionSize = res?.data || 0;
        }),
        switchMap(() =>
          this.administrationPostsService.getAll<Response<Post[]>>(`publications?page=${this.pageParam}`),
        ),
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.posts = data;
      });
  }

  onAdd(): void {
    // TODO
  }

  onEdit(id: number): void {
    // TODO
  }

  onDelete(id: number): void {
    // TODO
  }

  onPageChange(page: number): void {
    this.pageParam = page;

    this.router.navigate(['administration', 'posts'], { queryParams: { page } });
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
      .subscribe((e) => {
        if (e instanceof NavigationEnd && e.url === '/login') {
          return;
        }

        this.getPosts();
      });
  }
}
