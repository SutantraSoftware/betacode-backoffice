import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://betacode-backend-q29d.onrender.com/betacode/api';
  private authStatusSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.authStatusSubject.next(this.isAuthenticated());
    const storedStatus = localStorage.getItem('authStatus');
    this.authStatusSubject.next(storedStatus === 'true');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(() => {
          this.authStatusSubject.next(true);
          localStorage.setItem('authStatus', 'true');
        })
      );
  }

  signup(data: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap(() => {
        this.authStatusSubject.next(true);
      })
    );
  }

  logout(): void {
    this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe(() => {
        this.authStatusSubject.next(false);
        localStorage.removeItem('authStatus');
      });
  }

  isAuthenticated(): boolean {
    return this.authStatusSubject.value;
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatusSubject.asObservable();
  }
}
