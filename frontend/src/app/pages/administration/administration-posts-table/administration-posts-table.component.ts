import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Post } from '../../posts/shared/models/post.interface';
import { Path } from '../../../shared/enum/path.enum';
import { AdministrationPostsService } from '../shared/services/administration-posts/administration-posts.service';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@UntilDestroy()
@Component({
  selector: 'app-administration-posts-table',
  templateUrl: './administration-posts-table.component.html',
  styleUrls: ['./administration-posts-table.component.scss'],
})
export class AdministrationPostsTableComponent {
  @Input() items: Post[] = [];
  @Input() entityName?: string;
  // @Input() path?: Path;
  @Output() deleted = new EventEmitter<void>();

  readonly postsPath: Path = Path.posts;

  constructor(
    private readonly modalService: NgbModal,
    private readonly administrationPostsService: AdministrationPostsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  async onAdd(path: string): Promise<void> {
    await this.router.navigateByUrl(`administration/${path}/add`);
  }

  async onEdit(path: string, parameter: string | number): Promise<void> {
    await this.router.navigateByUrl(`administration/${path}/${parameter}/edit`);
  }

  async onDelete(path: string, id: number): Promise<void> {
    try {
      const hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
      if (!hasUserValidated) {
        return;
      }

      this.administrationPostsService
        .delete(path, id)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.deleted.emit();
        });
    } catch (e) {}
  }
}
