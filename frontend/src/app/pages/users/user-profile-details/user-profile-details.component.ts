import { Component } from '@angular/core';
import { ModalReportComponent } from '../../../shared/components/modal-report/modal-report.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent {
  constructor(private readonly modalService: NgbModal) {}

  async onReport(): Promise<void> {
    try {
      const description = await this.modalService.open(ModalReportComponent).result;
      console.log(description);
      // TODO
    } catch (_) {}
  }
}
