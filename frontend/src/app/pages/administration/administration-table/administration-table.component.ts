import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from '../../../shared/components/toast/shared/toast.service';
import { Path } from '../../../shared/enum/path.enum';

@Component({
  selector: 'app-administration-table',
  templateUrl: './administration-table.component.html',
  styleUrls: ['./administration-table.component.scss'],
})
export class AdministrationTableComponent<T> implements OnInit, OnChanges {
  @Input() items: T[] = [];
  @Input() entityName?: string;
  @Input() path?: Path;

  readonly categoriesPath: Path = Path.categories;
  readonly postsPath: Path = Path.posts;
  readonly reportedPostsPath: Path = Path.reportedPosts;
  readonly reportedUsersPath: Path = Path.reportedUsers;
  readonly usersPath: Path = Path.users;

  constructor(
    private readonly route: ActivatedRoute,
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
    console.log(this.items);
    const areInputsInvalid = !this.entityName || !this.path;
    if (areInputsInvalid) {
      this.stopRendering();
    }
  }

  async onAdd(path: string): Promise<void> {
    console.log('onAdd');
    if (path === this.postsPath) {
      return;
    }

    await this.router.navigateByUrl(`administration/${path}/add`);
  }

  async onEdit(path: string, parameter: string | number): Promise<void> {
    await this.router.navigateByUrl(`administration/${path}/${parameter}/edit`);
  }

  onDelete(id: number): void {
    // TODO
  }

  private stopRendering(): void {
    this.items = [];
    this.toastService.showDanger(`Une erreur est survenue sur la propriété d'entité.`);
  }
}
