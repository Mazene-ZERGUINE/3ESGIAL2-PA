import { Injectable } from '@angular/core';
import { CoreService } from '../crud/core.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostFavoritesService extends CoreService {
  private readonly _starInfo$ = new BehaviorSubject<{ [key: string]: { starred: boolean } }>({});

  get starInfo$(): Observable<{ [key: string]: { starred: boolean } }> {
    return this._starInfo$.asObservable();
  }

  emitStarInfo(info: { [key: number]: { starred: boolean } }) {
    this._starInfo$.next(info);
  }
}
