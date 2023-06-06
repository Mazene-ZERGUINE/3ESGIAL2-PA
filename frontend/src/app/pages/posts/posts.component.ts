import { Component, OnInit } from '@angular/core';
import { Post } from './shared/models/post.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts$?: Observable<null | Post[]>;
  selectedPost?: Post;

  constructor() {}

  ngOnInit(): void {
    this.getPosts();
  }

  /**
   * TODO
   */
  getPosts(): void {
    const arr = [];
    for (let i = 1; i <= 21; i++) {
      const obj: Post = {
        publication_id: i + 1,
        titre: `titre ${i}`,
        description: `description ${i}`,
        statut: 'actif',
        images: [
          {
            image_id: 1,
            libelle: 'libelle 1',
            lien: 'lien 1',
            publication_id: 1,
          },
          {
            image_id: 2,
            libelle: 'libelle 2',
            lien: 'lien 2',
            publication_id: 2,
          },
          {
            image_id: 3,
            libelle: 'libelle 3',
            lien: 'lien 3',
            publication_id: 3,
          },
        ],
      };

      arr.push(obj);
    }

    arr.push({
      publication_id: arr.length + 1,
      titre: `titre ${arr.length + 1}`,
      description: `description ${arr.length + 1}`,
      statut: 'actif',
      images: [],
    });
    arr.push({
      publication_id: arr.length + 1,
      titre: `titre ${arr.length + 1}`,
      description: `description ${arr.length + 1}`,
      statut: 'inactif',
      images: [],
    });

    this.posts$ = of(arr);
  }

  selectPost(post: Post): void {
    this.selectedPost = post;
  }
}
