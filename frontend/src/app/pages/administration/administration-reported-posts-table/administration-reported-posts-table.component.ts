import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostReport } from '../../../shared/core/models/interfaces/post-report.interface';
import { Path } from '../../../shared/enum/path.enum';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Entity } from '../shared/enum/entity.enum';
import { PostReportsService } from '../../../shared/core/services/post-reports/post-reports.service';

@UntilDestroy()
@Component({
  selector: 'app-administration-reported-posts-table',
  templateUrl: './administration-reported-posts-table.component.html',
  styleUrls: ['./administration-reported-posts-table.component.scss'],
})
export class AdministrationReportedPostsTableComponent {
  @Input() items: PostReport[] = [];
  @Input() entityName? = Entity.publicationSignalement;

  @Output() deleted = new EventEmitter<void>();

  readonly postReportsPath: Path = Path.reportedPosts;

  constructor(
    private readonly modalService: NgbModal,
    private readonly postReportsService: PostReportsService,
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

      this.postReportsService
        .delete(path, id)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.deleted.emit();
        });
    } catch (e) {}
  }
}
