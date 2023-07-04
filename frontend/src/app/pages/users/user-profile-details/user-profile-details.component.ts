import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ModalReportComponent } from '../../../shared/components/modal-report/modal-report.component';
import { UserProfileService } from '../shared/services/user-profile/user-profile.service';
import { User } from '../../../shared/core/models/interfaces/user.interface';
import { map, switchMap, tap } from 'rxjs';
import { Response } from '../../../shared/core/models/interfaces/response.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserPostsService } from '../shared/services/user-posts/user-posts.service';

@UntilDestroy()
@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit {
  usernameParam: string;
  user?: User;
  postsCount = 0;

  constructor(
    private readonly jwtHelper: JwtHelperService,
    private readonly modalService: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly userPostsService: UserPostsService,
    private readonly userProfileService: UserProfileService,
  ) {
    this.usernameParam = this.route.snapshot.paramMap.get('username') || '';
  }

  async ngOnInit(): Promise<void> {
    // TODO utilisateur inexistant
    this.getUser();
  }

  async onReport(): Promise<void> {
    try {
      const description = await this.modalService.open(ModalReportComponent).result;
      console.log(description);
      // TODO
    } catch (_) {}
  }

  getUser() {
    this.userPostsService
      .count<Response<number>>(`utilisateurs/${this.usernameParam}/publications/count/public`)
      .pipe(
        tap((res) => (this.postsCount = res.data)),
        switchMap((_) => this.userProfileService.getOneByField<Response<User>>('utilisateurs', this.usernameParam)),
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.user = data;
      });
  }
}
