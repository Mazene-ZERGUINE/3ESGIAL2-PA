import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, filter, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Favorite } from '../shared/models/favorite.interface';
import { UserFavoritesService } from '../shared/services/user-favorites/user-favorites.service';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { ToastService } from 'src/app/shared/components/toast/shared/toast.service';
import { Status } from '../../sign-up/shared/enums/status.enum';

@UntilDestroy()
@Component({
  selector: 'app-user-favorites-list',
  templateUrl: './user-favorites-list.component.html',
  styleUrls: ['./user-favorites-list.component.scss'],
})
export class UserFavoritesListComponent implements OnInit {
  readonly activeStatus = Status.active;

  collectionSize = 0;
  decodedToken: any;
  favorites?: Favorite[];
  isLoading = true;
  pageParam = 1;
  starInfo: { [key: string]: { starred: boolean } } = {};

  constructor(
    private readonly jwtHelper: JwtHelperService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly userFavoritesService: UserFavoritesService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscribeToRouter();
    this.subscribeToQueryParams();

    await this.setDecodedToken();
    this.getFavorites();
  }

  onPageChange(page: number): void {
    this.pageParam = page;

    this.router.navigate(['users', 'favorites'], { queryParams: { page } });
  }

  async onUnstar(e: MouseEvent, postId: number): Promise<void> {
    e.preventDefault();
    e.stopPropagation();

    this.userFavoritesService
      .delete('favoris/publications', postId)
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.getFavorites();
      });
  }

  private getFavorites() {
    const { pseudonyme } = this.decodedToken;

    this.userFavoritesService
      .getOneByField<Response<{ count: number; rows: Favorite[] }>>(
        'utilisateurs',
        `${pseudonyme}/favoris?page=${this.pageParam}`,
      )
      .pipe(
        map((res) => res?.data),
        catchError((err) => {
          this.isLoading = false;
          return of(err);
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        if (!data || data instanceof HttpErrorResponse) {
          return;
        }

        this.collectionSize = data.count;
        this.favorites = data.rows;
        this.isLoading = false;
      });
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

        this.getFavorites();
      });
  }

  private async setDecodedToken(): Promise<void> {
    const token = await this.jwtHelper.tokenGetter();
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }
}
