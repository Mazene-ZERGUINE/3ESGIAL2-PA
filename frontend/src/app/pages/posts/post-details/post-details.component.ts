import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Post } from '../shared/models/post.interface';
import { ModalFocusConfirmComponent } from '../../../shared/components/modal-focus-confirm/modal-focus-confirm.component';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  images = [];
  post?: Post; // TODO: data in service?

  constructor(private readonly modalService: NgbModal, private readonly router: Router) {}

  ngOnInit(): void {
    this.setImages();
  }

  setImages(): void {
    // TODO
  }

  async onDelete(): Promise<void> {
    let hasUserValidated;
    try {
      hasUserValidated = await this.modalService.open(ModalFocusConfirmComponent).result;
    } catch (_) {}

    if (!hasUserValidated) {
      return;
    }

    // TODO
  }

  async onEdit(id: number): Promise<void> {
    await this.router.navigateByUrl(`posts/${id}/edit`);
  }

  onStar(): void {
    // TODO
  }

  onUnstar(): void {
    // TODO
  }
}
