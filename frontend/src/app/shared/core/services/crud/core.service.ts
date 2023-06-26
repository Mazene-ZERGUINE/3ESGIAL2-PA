import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class CoreService {
  private readonly _apiUrl: string;

  protected constructor(protected readonly httpClient: HttpClient) {
    this._apiUrl = environment.apiUrl;
  }

  count<T>(path: string): Observable<T> {
    return this.httpClient.get<T>(this.getPath(path));
  }

  create(path: string, payload: any): Observable<void> {
    return this.httpClient.post<void>(this.getPath(path), payload);
  }

  delete(path: string, id: number): Observable<void> {
    return this.httpClient.delete<void>(this.getPath(path, id));
  }

  //#region     GET methods
  getAll<T>(path: string): Observable<T> {
    return this.httpClient.get<T>(this.getPath(path));
  }

  getOneByField<T>(path: string, field: string): Observable<T> {
    return this.httpClient.get<T>(this.getPath(path, field));
  }

  getOneById<T>(path: string, id: number): Observable<T> {
    return this.httpClient.get<T>(this.getPath(path, id));
  }

  //#endregion  GET methods

  //#region     UPDATE methods
  updateByField(path: string, field: string, payload: any): Observable<void> {
    return this.httpClient.put<void>(this.getPath(path, field), payload);
  }

  updateById(path: string, id: number, payload: any): Observable<void> {
    return this.httpClient.put<void>(this.getPath(path, id), payload);
  }

  //#endregion  UPDATE methods

  protected getPath(_path: string, id?: number | string): string {
    const path = `${this._apiUrl}/${_path}`;

    return !id ? path : `${path}/${id}`;
  }
}
