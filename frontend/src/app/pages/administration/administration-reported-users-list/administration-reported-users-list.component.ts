import { Component } from '@angular/core';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserReportsService } from '../../users/shared/services/user-reports/user-reports.service';
import { filter, map, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { UserReport } from '../../../shared/core/models/interfaces/user-report.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-reported-users-list',
  templateUrl: './administration-reported-users-list.component.html',
  styleUrls: ['./administration-reported-users-list.component.scss'],
})
export class AdministrationReportedUsersListComponent {
  collectionSize = 0;
  reportedUsers: UserReport[] = [];
  entityName = Entity.personneSignalement;
  page = 1;
  path = Path.reportedUsers;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userReportsService: UserReportsService,
  ) {}

  ngOnInit(): void {
    this.subscribeToRouter();
    this.subscribeToQueryParams();

    this.getReportedUsers();
  }

  getReportedUsers() {
    this.userReportsService
      .getAll<Response<{ count: number; rows: UserReport[] }>>('utilisateur-signalements')
      .pipe(
        map((res) => res?.data),
        tap((data) => {
          this.collectionSize = data.count || 0;
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.reportedUsers = data.rows;
      });
  }

  onPageChange(page: number): void {
    this.page = page;

    this.router.navigate(['administration', 'reported-users'], { queryParams: { page: this.page } });
  }

  private subscribeToQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = Number(params['page']) || 1;
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

        this.getReportedUsers();
      });
  }
}
