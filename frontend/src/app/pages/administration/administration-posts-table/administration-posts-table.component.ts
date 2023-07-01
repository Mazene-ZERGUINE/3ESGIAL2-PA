import { Component, Input } from '@angular/core';
import { Path } from '../../../shared/enum/path.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { Post } from '../../posts/shared/models/post.interface';

@Component({
  selector: 'app-administration-posts-table',
  templateUrl: './administration-posts-table.component.html',
  styleUrls: ['./administration-posts-table.component.scss'],
})
export class AdministrationPostsTableComponent {
  @Input() items: Post[] = [];
  @Input() entityName?: string;
  // @Input() path?: Path;

  readonly postsPath: Path = Path.posts;

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
