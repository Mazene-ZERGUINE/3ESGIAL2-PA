import { Component } from '@angular/core';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';

@Component({
  selector: 'app-administration-reported-users-list',
  templateUrl: './administration-reported-users-list.component.html',
  styleUrls: ['./administration-reported-users-list.component.scss'],
})
export class AdministrationReportedUsersListComponent {
  reportedUser = [];
  entityName = Entity.personneSignalement;
  page = 1;
  path = Path.reportedUsers;

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
