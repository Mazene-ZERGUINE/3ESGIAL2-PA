import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../shared/models/post.interface';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  images = [];
  post?: Post; // TODO: data in service?

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.setImages();
  }

  setImages(): void {
    // TODO
  }

  onDelete(): void {
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
