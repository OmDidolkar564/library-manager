import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    this.restoreSession();
  }

  /**
   * Restore user session from localStorage
   */
  private restoreSession(): void {
    const token = this.getToken();
    const storedUser = localStorage.getItem(this.userKey);

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUser$.next(user);
      } catch (e) {
        this.clearSession();
      }
    }
  }

  /**
   * Register new user
   */
  register(data: {
    username: string;
    email: string;
    fullName: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          this.setSession(response.token, response.user);
        }
      })
    );
  }

  /**
   * Login user with username and password
   */
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.baseUrl}/login`, loginData).pipe(
      tap((response: any) => {
        if (response.token && response.user) {
          this.setSession(response.token, response.user);
        }
      })
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    this.clearSession();
    this.currentUser$.next(null);
  }

  /**
   * Set session (token + user)
   */
  private setSession(token: string, user: User): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUser$.next(user);
  }

  /**
   * Clear session
   */
  private clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return !!this.getToken() && this.currentUser$.value !== null;
  }

  /**
   * Check if current user is librarian
   */
  isLibrarian(): boolean {
    return this.currentUser$.value?.role === 'librarian';
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUser$.value;
  }
}