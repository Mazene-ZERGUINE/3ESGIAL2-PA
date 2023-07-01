import { Injectable } from '@angular/core';
import { CoreService } from '../../../../../shared/core/services/crud/core.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends CoreService {
  private readonly _posts$ = new BehaviorSubject<Post[]>([]);
  private readonly _selectedPost$ = new BehaviorSubject<null | Post>(null);

  get posts$() {
    return this._posts$.asObservable();
  }

  get selectedPost$() {
    return this._selectedPost$.asObservable();
  }

  emitPosts(posts: Post[]) {
    this._posts$.next(posts);
  }

  emitSelectedPost(post: null | Post) {
    this._selectedPost$.next(post);
  }

  search<T>(path: string, payload: any): Observable<T> {
    return this.httpClient.post<T>(this.getPath(path), payload);
  }
}
