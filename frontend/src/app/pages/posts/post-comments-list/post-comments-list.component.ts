import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { PostComment } from '../shared/models/post-comment.interface';

@Component({
  selector: 'app-post-comments-list',
  templateUrl: './post-comments-list.component.html',
  styleUrls: ['./post-comments-list.component.scss'],
})
export class PostCommentsListComponent implements OnInit {
  comments: PostComment[] = [];
  @ViewChild('commentsContainer') commentsContainerRef?: ElementRef;

  isLoading = false;
  page = 1;

  ngOnInit(): void {
    // TODO: data from service
    const comments = [];
    for (let i = 1; i <= 10; i++) {
      comments.push({
        utilisateur_id: 1,
        publication_id: 1,
        commentaire: `lorem ipsum ${i}`,
        created_at: new Date(),
      });
    }
    this.comments = comments;

    this.loadComments();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const documentHeight = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const modifierPixel = 20; // px from the bottom

    const hasReachedBottomPage: boolean = currentScroll + modifierPixel > documentHeight;
    if (hasReachedBottomPage) {
      this.page++;
      this.loadComments();
    }
  }

  loadComments(): void {
    // TODO
    this.isLoading = true;
    // this.commentService.getComments(this.page).subscribe((comments) => {
    //   this.comments = this.comments.concat(comments);
    //   this.isLoading = false;
    // });
    const comments = [];
    for (let i = 1; i <= 10; i++) {
      comments.push({
        utilisateur_id: 1,
        publication_id: 1,
        commentaire: `lorem ipsum ${i}`,
        created_at: new Date(),
      });
    }
    this.comments = [...this.comments, ...comments];
    this.isLoading = false;
  }

  onDelete(publicationId: number, utilisateurId: number): void {
    // TODO
  }
}
