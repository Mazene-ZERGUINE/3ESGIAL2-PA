import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { User } from '../../../shared/core/models/interfaces/user.interface';
import { Path } from '../../../shared/enum/path.enum';
import { AdministrationUsersService } from '../shared/services/administration-users/administration-users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';
import { AuthService } from 'src/app/shared/core/services/auth/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-administration-users-table',
  templateUrl: './administration-users-table.component.html',
  styleUrls: ['./administration-users-table.component.scss'],
})
export class AdministrationUsersTableComponent {
  @Input() items: User[] = [];
  @Input() entityName?: string;
  // @Input() path?: Path;
  @Output() deleted = new EventEmitter<void>();

  readonly usersPath: Path = Path.users;

  constructor(
    private readonly administrationUsersService: AdministrationUsersService,
    private readonly authService: AuthService,
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

      const isMyself = (await this.authService.getCurrentUserId()) === id;

      this.administrationUsersService
        .delete(path, id)
        .pipe(untilDestroyed(this))
        .subscribe((_) => {
          if (isMyself) {
            this.authService.deleteToken();
            // this.router.navigateByUrl('signup');
            location.href = '/signup';
            return;
          }

          this.deleted.emit();
        });
    } catch (e) {}
  }
}
