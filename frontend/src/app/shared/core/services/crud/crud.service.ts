import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {
  private readonly _apiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  create(path: string, payload: T): void {
    this.httpClient.post<void>(this.getPath(path), payload);
  }

  //#region GET methods
  getAll(path: string): Observable<T[]> {
    return this.httpClient.get<T[]>(this.getPath(path));
  }

  getOneById(path: string, id: number): Observable<T> {
    return this.httpClient.get<T>(this.getPath(path, id));
  }
  //#endregion

  updateById(path: string, id: number, payload: T): Observable<void> {
    return this.httpClient.put<void>(this.getPath(path, id), payload);
  }

  delete(path: string, id: number): Observable<void> {
    return this.httpClient.delete<void>(this.getPath(path, id));
  }

  private getPath(_path: string, id?: number | string): string {
    const path = `${this._apiUrl}/${_path}`;

    return !id ? path : `${path}/${id}`;
  }
}
