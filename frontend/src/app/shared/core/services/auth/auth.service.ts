import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../../../environments/environment';
import { Role } from '../../../../pages/sign-up/shared/enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly _isAuthenticated$ = new BehaviorSubject(false);
  private readonly _isAdmin$ = new BehaviorSubject(false);

  constructor(private readonly httpClient: HttpClient, private readonly jwtHelper: JwtHelperService) {}

  get isAdmin() {
    return this._isAdmin$.value;
  }

  get isAdmin$() {
    return this._isAdmin$.asObservable();
  }

  get isAuthenticated() {
    return this._isAuthenticated$.value;
  }

  get isAuthenticated$() {
    return this._isAuthenticated$.asObservable();
  }

  async getCurrentUserId(): Promise<undefined | number> {
    const token = await this.jwtHelper.tokenGetter();

    return this.jwtHelper.decodeToken(token)?.utilisateur_id;
  }

  emitOnIsAdmin$(value: boolean): void {
    this._isAdmin$.next(value);
  }

  async setToken(token: null | string) {
    if (!token) {
      this.deleteToken();
      return;
    }

    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    this._isAuthenticated$.next(true);

    const role = await this.jwtHelper.decodeToken(token)?.role;
    this._isAdmin$.next(role === Role.admin);
  }

  deleteToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this._isAuthenticated$.next(false);
    this._isAdmin$.next(false);
  }

  emitOnIsAuthenticated$(value: boolean): void {
    this._isAuthenticated$.next(value);
  }

  logIn(payload: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>(`${this.API_URL}/log-in`, payload);
  }

  logOut(): Observable<void> {
    return this.httpClient.get<void>(`${this.API_URL}/log-out`);
  }
}
