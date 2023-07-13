import { Injectable } from '@angular/core';
import { CoreService } from '../crud/core.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostReportsService extends CoreService {
  private readonly _reportInfo$ = new BehaviorSubject<{ [key: string]: { reported: boolean } }>({});

  get reportInfo$(): Observable<{ [key: string]: { reported: boolean } }> {
    return this._reportInfo$.asObservable();
  }

  emitReportInfo(info: { [key: number]: { reported: boolean } }) {
    this._reportInfo$.next(info);
  }
}
