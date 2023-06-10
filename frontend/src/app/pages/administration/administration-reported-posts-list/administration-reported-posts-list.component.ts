import { Component } from '@angular/core';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';

@Component({
  selector: 'app-administration-reported-posts-list',
  templateUrl: './administration-reported-posts-list.component.html',
  styleUrls: ['./administration-reported-posts-list.component.scss'],
})
export class AdministrationReportedPostsListComponent {
  reportedPosts = [];
  entityName = Entity.publicationSignalement;
  page = 1;
  path = Path.reportedPosts;

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
