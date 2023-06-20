import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../shared/models/post.interface';
import { Router } from '@angular/router';
import { Status } from '../../sign-up/shared/enums/status.enum';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  @Input() currentUserId?: number;
  @Input() isAuthenticated: null | boolean = false;
  @Input() posts: null | Post[] = [];
  @Output() selected = new EventEmitter<Post>();

  readonly activeStatus = Status.active;

  constructor(public readonly sanitizer: DomSanitizer, private readonly router: Router) {}

  onDislike(e: MouseEvent): void {
    this.stopPropagation(e);
    // TODO
  }

  async onLike(e: MouseEvent): Promise<void> {
    if (!this.isAuthenticated) {
      await this.router.navigateByUrl('/login');
    }

    this.stopPropagation(e);
    // TODO
  }

  async onReport(e: MouseEvent): Promise<void> {
    if (!this.isAuthenticated) {
      await this.router.navigateByUrl('/login');
    }

    this.stopPropagation(e);
    // TODO
  }

  onStar(e: MouseEvent): void {
    this.stopPropagation(e);
    // TODO
  }

  onUnstar(e: MouseEvent): void {
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
