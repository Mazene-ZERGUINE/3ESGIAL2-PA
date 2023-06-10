import { Component } from '@angular/core';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';

@Component({
  selector: 'app-administration-users-list',
  templateUrl: './administration-users-list.component.html',
  styleUrls: ['./administration-users-list.component.scss'],
})
export class AdministrationUsersListComponent {
  users = [];
  entityName = Entity.utilisateur;
  page = 1;
  path = Path.users;

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
