import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { UserReportsService } from '../../users/shared/services/user-reports/user-reports.service';
import { UserReport } from '../../../shared/core/models/interfaces/user-report.interface';

@UntilDestroy()
@Component({
  selector: 'app-administration-reported-users-table',
  templateUrl: './administration-reported-users-table.component.html',
  styleUrls: ['./administration-reported-users-table.component.scss'],
})
export class AdministrationReportedUsersTableComponent {
  @Input() items: UserReport[] = [];
  @Input() entityName? = Entity.utilisateurSignalement;

  @Output() deleted = new EventEmitter<void>();

  readonly userReportsPath: Path = Path.reportedUsers;

  constructor(
    private readonly modalService: NgbModal,
    private readonly userReportsService: UserReportsService,
    private readonly router: Router,
  ) {}

  async onEdit(path: string, parameter: string | number): Promise<void> {
    await this.router.navigateByUrl(`administration/${path}/${parameter}/edit`);
  }

  async onDelete(path: string, id: number): Promise<void> {
    try {
      const hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
      if (!hasUserValidated) {
        return;
      }

      this.userReportsService
        .delete(path, id)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.deleted.emit();
        });
    } catch (e) {}
  }

  async onSee(path: string, parameter: string | number): Promise<void> {
    await this.router.navigateByUrl(`${path}/${parameter}`);
  }
}
