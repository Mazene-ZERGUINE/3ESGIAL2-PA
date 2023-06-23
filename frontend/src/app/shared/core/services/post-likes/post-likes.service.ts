import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostLikesService extends CrudService {
  private readonly _currentCountPost$ = new BehaviorSubject<number>(0);
  private readonly _likeInfo$ = new BehaviorSubject<{ [key: string]: { count: number; liked: boolean } }>({});

  get currentCountPost$(): Observable<number> {
    return this._currentCountPost$.asObservable();
  }

  get likeInfo$(): Observable<{ [p: string]: { count: number; liked: boolean } }> {
    return this._likeInfo$.asObservable();
  }

  emitCurrentCountPost(value: number): void {
    this._currentCountPost$.next(value);
  }

  emitLikeInfo(info: { [key: number]: { count: number; liked: boolean } }) {
    this._likeInfo$.next(info);
  }

  getByPostId<T>(path: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.getPath(path, id)}/count`);
  }

  deleteLike(path: string, id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.getPath(path, id)}/count`);
  }
}
