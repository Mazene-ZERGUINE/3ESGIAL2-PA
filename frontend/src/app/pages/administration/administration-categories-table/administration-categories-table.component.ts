import { Component, Input } from '@angular/core';
import { Path } from '../../../shared/enum/path.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { Categorie } from '../../posts/shared/models/post.interface';

@Component({
  selector: 'app-administration-categories-table',
  templateUrl: './administration-categories-table.component.html',
  styleUrls: ['./administration-categories-table.component.scss'],
})
export class AdministrationCategoriesTableComponent {
  @Input() items: Categorie[] = [];
  @Input() entityName?: string;
  // @Input() path?: Path;

  readonly categoriesPath: Path = Path.categories;

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
