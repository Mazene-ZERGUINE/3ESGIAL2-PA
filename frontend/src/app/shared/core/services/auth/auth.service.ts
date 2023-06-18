import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly _isAuthenticated$ = new BehaviorSubject(false);

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {}

  get isAuthenticated() {
    return this._isAuthenticated$.value;
  }

  get isAuthenticated$() {
    return this._isAuthenticated$.asObservable();
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

  // emitOnIsAuthenticated$(value: boolean) {
  //   this._isAuthenticated$.next(value);
  // }

  logIn(payload: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.httpClient.post<{ access_token: string }>(`${this.API_URL}/log-in`, payload);
  }

  async logOut(): Promise<void> {
    this.setToken(null);
    this._isAuthenticated$.next(false);
    await this.router.navigate(['/login']);
  }
}
