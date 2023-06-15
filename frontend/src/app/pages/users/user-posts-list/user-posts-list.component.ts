import { Component, OnInit } from '@angular/core';

import { Entity } from '../../administration/shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';

@Component({
  selector: 'app-user-posts-list',
  templateUrl: './user-posts-list.component.html',
  styleUrls: ['./user-posts-list.component.scss'],
})
export class UserPostsListComponent implements OnInit {
  entityName = Entity.publication;
  page = 1;
  path = Path.posts;
  posts = [];

  ngOnInit(): void {
    // TODO
  }

  // async onEdit(path: string, id: number): Promise<void> {
  //   // await this.router.navigateByUrl(`administration/${path}/${id}/edit`);
  // }
  //
  // async onDelete(id: number): Promise<void> {
  //   let hasUserValidated;
  //   try {
  //     hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
  //   } catch (_) {}
  //
  //   if (!hasUserValidated) {
  //     return;
  //   }
  //
  //   // TODO
  // }
  //
  // onPageChange(page: number): void {
  //   this.page = page;
  //   // TODO
  // }
}
