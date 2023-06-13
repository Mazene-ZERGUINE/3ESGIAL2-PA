import { Component } from '@angular/core';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';

@Component({
  selector: 'app-administration-posts-list',
  templateUrl: './administration-posts-list.component.html',
  styleUrls: ['./administration-posts-list.component.scss'],
})
export class AdministrationPostsListComponent {
  users = [];
  entityName = Entity.publication;
  page = 1;
  path = Path.posts;

  ngOnInit(): void {
    // TODO
  }

  onAdd(): void {
    // TODO
  }

  onEdit(id: number): void {
    // TODO
  }

  onDelete(id: number): void {
    // TODO
  }
}
