import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../shared/models/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  @Input() posts: Post[] = [];
  @Output() selected = new EventEmitter<Post>();

  selectPost(post: Post): void {
    this.selected.emit(post);
  }
}
