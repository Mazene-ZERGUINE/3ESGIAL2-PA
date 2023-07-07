import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ModalReportComponent } from '../../../shared/components/modal-report/modal-report.component';
import { UserProfileService } from '../shared/services/user-profile/user-profile.service';
import { User } from '../../../shared/core/models/interfaces/user.interface';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserPostsService } from '../shared/services/user-posts/user-posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../shared/core/services/auth/auth.service';
import { UserReputationsService } from '../shared/services/user-reputations/user-reputations.service';

@UntilDestroy()
@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit {
  currentUsername?: string;
  isAuthenticated: boolean;
  postsCount = 0;
  reputation = 0;
  usernameParam: string;
  user?: User;
  vote?: { vote?: number } | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService,
    private readonly modalService: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userPostsService: UserPostsService,
    private readonly userProfileService: UserProfileService,
    private readonly userReputationsService: UserReputationsService,
  ) {
    this.usernameParam = this.route.snapshot.paramMap.get('username') || '';
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  async ngOnInit(): Promise<void> {
    // TODO utilisateur inexistant
    this.getUserByPseudonyme();
    this.getVote();
    this.getUserReputation();

    await this.setCurrentUsername();
  }

  async setCurrentUsername(): Promise<any> {
    const token = await this.jwtHelper.tokenGetter();
    this.currentUsername = this.jwtHelper.decodeToken(token)?.pseudonyme;
  }

  async onReport(): Promise<void> {
    const isUnauthenticated = !this.isAuthenticated || !(await this.authService.getCurrentUserId());
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    try {
      const description = await this.modalService.open(ModalReportComponent).result;
      console.log(description);
      // TODO
    } catch (_) {}
  }

  getVote(): void {
    this.userReputationsService
      .getOneByField<Response<{ vote?: number }>>('reputations', `${this.usernameParam}/vote`)
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        console.log(data);
        this.vote = data;
      });
  }

  getUserReputation(): void {
    this.userReputationsService
      .getOneByField<Response<{ reputation: number }>>('reputations', this.usernameParam)
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => (this.reputation = data.reputation));
  }

  getUserByPseudonyme(): void {
    this.userPostsService
      .count<Response<number>>(`utilisateurs/${this.usernameParam}/publications/count/public`)
      .pipe(
        tap((res) => (this.postsCount = res.data)),
        switchMap(() =>
          this.userReputationsService.getOneByField<Response<{ reputation: number }>>(
            'reputations',
            this.usernameParam,
          ),
        ),
        tap((res) => {
          this.reputation = res.data.reputation;
        }),
        switchMap((_) => this.userProfileService.getOneByField<Response<User>>('utilisateurs', this.usernameParam)),
        map((res) => res?.data),
        catchError((err) => of(err)),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        if (data instanceof HttpErrorResponse) {
          this.router.navigateByUrl('/not-found', { skipLocationChange: true });
          return;
        }

        this.user = data;
      });
  }

  async onVote(value: number, type?: 'upVote' | 'downVote'): Promise<void> {
    const isUnauthenticated = !this.isAuthenticated || !(await this.authService.getCurrentUserId());
    if (isUnauthenticated) {
      await this.router.navigateByUrl('/login');
      return;
    }

    let vote = value;
    if (this.vote && type === 'downVote' && this.vote >= 1 && value === -1) {
      vote = value - 1;
    } else if (this.vote && type === 'upVote' && this.vote <= 1 && value === 1) {
      vote = value + 1;
    }

    this.userReputationsService
      .upsert(`reputations/${this.usernameParam}`, { vote })
      .pipe(untilDestroyed(this))
      .subscribe((_) => {
        this.getVote();
        this.getUserReputation();
      });
  }
}
