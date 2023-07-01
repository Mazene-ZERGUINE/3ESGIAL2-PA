import { Component } from '@angular/core';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';
import { AdministrationUsersService } from '../shared/services/administration-users/administration-users.service';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { User } from '../../../shared/core/models/interfaces/user.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, map, switchMap, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Categorie } from '../../posts/shared/models/post.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-users-list',
  templateUrl: './administration-users-list.component.html',
  styleUrls: ['./administration-users-list.component.scss'],
})
export class AdministrationUsersListComponent {
  collectionSize = 0;
  users: User[] = [];
  entityName = Entity.utilisateur;
  pageParam = 1;
  path = Path.users;

  constructor(
    private readonly administrationUsersService: AdministrationUsersService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.subscribeToRouter();
    this.subscribeToQueryParams();

    this.getUsers();
  }

  getUsers() {
    this.administrationUsersService
      .count<Response<number>>('utilisateurs/count/all')
      .pipe(
        tap((res) => {
          this.collectionSize = res?.data || 0;
        }),
        switchMap(() =>
          this.administrationUsersService.getAll<Response<User[]>>(`utilisateurs?page=${this.pageParam}`),
        ),
        map((res) => res?.data),
        map((data) => {
          if (!Array.isArray(data)) {
            return data;
          }

          const keysToRemove = ['mot_de_passe', 'sessions'];
          const newObj: Partial<User> = {};

          return data.map((obj: { [index: string]: any }) => {
            const newObj: any = {};

            Object.keys(obj).forEach((key) => {
              if (!keysToRemove.includes(key)) {
                newObj[key] = obj[key];
              }
            });

            return newObj;
          });
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.users = data;
      });
  }

  onPageChange(page: number): void {
    this.pageParam = page;

    this.router.navigate(['administration', 'users'], { queryParams: { page } });
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

      this.getUsers();
    });
  }
}
