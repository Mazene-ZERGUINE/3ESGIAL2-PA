import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Path } from '../../../shared/enum/path.enum';
import { Categorie } from '../../posts/shared/models/post.interface';
import { AdministrationCategoriesService } from '../shared/services/administration-categories/administration-categories.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';

@UntilDestroy()
@Component({
  selector: 'app-administration-categories-table',
  templateUrl: './administration-categories-table.component.html',
  styleUrls: ['./administration-categories-table.component.scss'],
})
export class AdministrationCategoriesTableComponent {
  @Input() items: Categorie[] = [];
  @Input() entityName?: string;
  // @Input() path?: Path;
  @Output() deleted = new EventEmitter<void>();

  readonly categoriesPath: Path = Path.categories;

  constructor(
    private readonly administrationCategoriesService: AdministrationCategoriesService,
    private readonly modalService: NgbModal,
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

      this.administrationCategoriesService
        .delete(path, id)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.deleted.emit();
        });
    } catch (e) {}
  }
}
