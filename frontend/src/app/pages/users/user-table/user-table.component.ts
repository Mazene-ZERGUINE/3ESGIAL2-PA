import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Path } from '../../../shared/enum/path.enum';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent<T> implements OnInit, OnChanges {
  @Input() items: T[] = [];
  @Input() entityName?: string;
  @Input() path?: Path;

  page = 1;

  constructor(
    private readonly modalService: NgbModal,
    private readonly router: Router,
    private readonly toastService: ToastService,
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

  async onDelete(id: number): Promise<void> {
    let hasUserValidated;
    try {
      hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
    } catch (_) {}

    if (!hasUserValidated) {
      return;
    }

    // TODO
  }

  async onEdit(path: string, id: number): Promise<void> {
    console.log(this.entityName);
    console.log(path, id);
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
