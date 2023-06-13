import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Post } from '../../posts/shared/models/post.interface';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';

@Component({
  selector: 'app-user-posts-list',
  templateUrl: './user-posts-list.component.html',
  styleUrls: ['./user-posts-list.component.scss'],
})
export class UserPostsListComponent implements OnInit {
  page = 1;
  posts$?: Observable<Post[]>;

  constructor(private readonly modalService: NgbModal) {}

  ngOnInit(): void {
    // TODO
  }

  async onEdit(path: string, id: number): Promise<void> {
    // await this.router.navigateByUrl(`administration/${path}/${id}/edit`);
  }

  async onDelete(id: number): Promise<void> {
    let hasUserValidated;
    try {
      hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
    } catch (_) {}

    if (!hasUserValidated) {
      return;
    }

    // TODO
  }

  onPageChange(page: number): void {
    this.page = page;
    // TODO
  }
}
