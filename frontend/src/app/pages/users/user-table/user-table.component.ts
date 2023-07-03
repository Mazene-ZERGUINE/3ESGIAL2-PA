import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Path } from '../../../shared/enum/path.enum';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { UserPostsService } from '../shared/services/user-posts/user-posts.service';

@UntilDestroy()
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent<T> implements OnInit, OnChanges {
  @Input() items: T[] = [];
  @Input() entityName?: string;
  @Input() path?: Path;
  @Output() deleted = new EventEmitter<void>();

  page = 1;

  constructor(
    private readonly modalService: NgbModal,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly userPostsService: UserPostsService,
  ) {}

  ngOnInit(): void {
    const areInputsInvalid = !this.entityName || !this.path;
    if (areInputsInvalid) {
      this.stopRendering();
    }

    // TODO
  }

  ngOnChanges(changes: SimpleChanges): void {
    const areInputsInvalid = !this.entityName || !this.path;
    if (areInputsInvalid) {
      this.stopRendering();
    }
  }

  async onAdd(path: string): Promise<void> {
    await this.router.navigateByUrl(`${path}/add`);
  }

  async onDelete(path: string, id: number): Promise<void> {
    try {
      const hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
      if (!hasUserValidated) {
        return;
      }

      this.userPostsService
        .delete(path, id)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          this.deleted.emit();
        });
    } catch (_) {}
  }

  async onEdit(path: string, id: number): Promise<void> {
    await this.router.navigateByUrl(`${path}/${id}/edit`);
  }

  onPageChange(page: number): void {
    this.page = page;
    // TODO
  }

  private stopRendering(): void {
    this.items = [];
    this.toastService.showDanger(`Une erreur est survenue sur la propriété d'entité.`);
  }
}
