import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../posts/shared/models/post.interface';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';
import { AdministrationCategoriesService } from '../shared/services/administration-categories/administration-categories.service';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-administration-categories-list',
  templateUrl: './administration-categories-list.component.html',
  styleUrls: ['./administration-categories-list.component.scss'],
})
export class AdministrationCategoriesListComponent implements OnInit {
  categories: Categorie[] = [];
  collectionSize = 0;
  entityName = Entity.categorie;
  pageParam = 1;
  path = Path.categories;

  constructor(
    private readonly administrationCategoriesService: AdministrationCategoriesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.subscribeToRouter();
    this.subscribeToQueryParams();

    this.getCategories();
  }

  getCategories(): void {
    this.administrationCategoriesService
      .count<Response<number>>('categories/count')
      .pipe(
        tap((res) => (this.collectionSize = res?.data || 0)),
        switchMap(() =>
          this.administrationCategoriesService.getAll<Response<Categorie[]>>(`categories?page=${this.pageParam}`),
        ),
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.categories = data;
      });
  }

  onPageChange(page: number): void {
    this.pageParam = page;

    this.router.navigate(['administration', 'categories'], { queryParams: { page } });
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

      this.getCategories();
    });
  }
}
