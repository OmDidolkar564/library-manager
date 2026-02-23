import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:3001/api/auth';

  currentUser$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this.currentUser$.next(res.user);
        })
      );
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  profile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser$.next(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  isLibrarian() {
    return this.currentUser$.value?.role === 'librarian';
  }
}