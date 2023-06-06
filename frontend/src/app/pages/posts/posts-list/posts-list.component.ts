import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../shared/models/post.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  @Input() posts: null | Post[] = [];
  @Output() selected = new EventEmitter<Post>();

  constructor(private readonly router: Router) {}

  onDelete(e: MouseEvent): void {
    this.stopPropagation(e);
    // TODO
  }

  onDislike(e: MouseEvent): void {
    this.stopPropagation(e);
    // TODO
  }

  async onEdit(e: MouseEvent, id: number): Promise<void> {
    this.stopPropagation(e);
    await this.router.navigateByUrl(`posts/${id}/edit`);
  }

  onLike(e: MouseEvent): void {
    this.stopPropagation(e);
    // TODO
  }

  onReport(e: MouseEvent): void {
    this.stopPropagation(e);
    // TODO
  }

  selectPost(post: Post): void {
    this.selected.emit(post);
  }

  stopPropagation(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  trackById(index: number, post: Post) {
    return post.publication_id;
  }
}
