import { Injectable } from '@angular/core';
import { CoreService } from '../../../../../shared/core/services/crud/core.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostCommentsService extends CoreService {
  private _comments = new BehaviorSubject([]);
  private _currentPage = new BehaviorSubject(1);

  get comments$() {
    return this._comments.asObservable();
  }

  get currentPage$() {
    return this._currentPage.asObservable();
  }

  emitCurrentPage(page: number) {
    this._currentPage.next(page);
  }

  resetCurrentPage() {
    this._currentPage.next(1);
  }

  getOneByPublicationId<T>(path: string, postId: number, page?: number): Observable<T> {
    const currentPage = page ?? this._currentPage.value;
    this.emitCurrentPage(currentPage + 1);

    return this.httpClient.get<T>(this.getPath(`${path}/${postId}?page=${currentPage}`));
  }
}
