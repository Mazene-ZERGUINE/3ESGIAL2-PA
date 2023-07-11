import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';

import { Path } from '../../../shared/enum/path.enum';
import { Entity } from '../shared/enum/entity.enum';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { PostReportsService } from 'src/app/shared/core/services/post-reports/post-reports.service';
import { PostReport } from '../../../shared/core/models/interfaces/post-report.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-reported-posts-list',
  templateUrl: './administration-reported-posts-list.component.html',
  styleUrls: ['./administration-reported-posts-list.component.scss'],
})
export class AdministrationReportedPostsListComponent {
  collectionSize = 0;
  postReports: PostReport[] = [];
  entityName = Entity.publication;
  pageParam = 1;
  path = Path.reportedPosts;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly postReportsService: PostReportsService,
  ) {}

  ngOnInit(): void {
    this.subscribeToRouter();
    this.subscribeToQueryParams();

    this.getPostReports();
  }

  getPostReports() {
    this.postReportsService
      .getAll<Response<any>>(`publication-signalements?page=${this.pageParam}`)
      .pipe(
        map((res) => res?.data),
        tap((data) => {
          this.collectionSize = data.count || 0;
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.postReports = data.rows;
      });
  }

  onPageChange(page: number): void {
    this.pageParam = page;

    this.router.navigate(['administration', 'reported-posts'], { queryParams: { page: this.pageParam } });
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

        this.getPostReports();
      });
  }
}
