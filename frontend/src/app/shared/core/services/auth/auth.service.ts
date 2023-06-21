import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly _isAuthenticated$ = new BehaviorSubject(false);

  constructor(private readonly httpClient: HttpClient, private readonly jwtHelper: JwtHelperService) {}

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

  setToken(token: null | string) {
    if (!token) {
      this.deleteToken();
      return;
    }

    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    this._isAuthenticated$.next(true);
  }

  deleteToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    this._isAuthenticated$.next(false);
  }

  emitOnIsAuthenticated$(value: boolean) {
    this._isAuthenticated$.next(value);
  }

  logIn(payload: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>(`${this.API_URL}/log-in`, payload);
  }

  logOut(): Observable<void> {
    return this.httpClient.get<void>(`${this.API_URL}/log-out`);
  }
}
