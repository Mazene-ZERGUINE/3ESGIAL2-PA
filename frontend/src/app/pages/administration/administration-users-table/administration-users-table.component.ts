import { Component, Input, SimpleChanges } from '@angular/core';
import { Path } from '../../../shared/enum/path.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { User } from '../../../shared/core/models/interfaces/user.interface';

@Component({
  selector: 'app-administration-users-table',
  templateUrl: './administration-users-table.component.html',
  styleUrls: ['./administration-users-table.component.scss'],
})
export class AdministrationUsersTableComponent {
  @Input() items: User[] = [];
  @Input() entityName?: string;
  // @Input() path?: Path;

  readonly usersPath: Path = Path.users;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toastService: ToastService,
  ) {}

  async onAdd(path: string): Promise<void> {
    await this.router.navigateByUrl(`administration/${path}/add`);
  }

  async onEdit(path: string, parameter: string | number): Promise<void> {
    await this.router.navigateByUrl(`administration/${path}/${parameter}/edit`);
  }

  onDelete(): void {
    // TODO
  }
}
