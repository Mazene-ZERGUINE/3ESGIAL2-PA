import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ModalReportComponent } from '../../../shared/components/modal-report/modal-report.component';
import { UserProfileService } from '../shared/services/user-profile/user-profile.service';
import { User } from '../../../shared/core/models/interfaces/user.interface';
import { map } from 'rxjs';
import { Response } from '../../../shared/core/models/interfaces/response.interface';

@UntilDestroy()
@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit {
  usernameParam: string;
  user?: User;

  constructor(
    private readonly modalService: NgbModal,
    private readonly route: ActivatedRoute,
    private readonly userProfileService: UserProfileService,
  ) {
    this.usernameParam = this.route.snapshot.paramMap.get('username') || '';
  }

  ngOnInit(): void {
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
    this.userProfileService
      .getOneByField<Response<User>>('utilisateurs', this.usernameParam)
      .pipe(
        map((res) => res?.data),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        console.log('sub getuser', data);
        this.user = data;
      });
  }
}
