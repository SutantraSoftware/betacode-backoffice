import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private router = inject(Router); // Inject router
  constructor() {
    // Restore login state on app start
    const savedLoginState = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = savedLoginState === 'true';
  }
  login() {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true'); // Save login state
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn'); // Clear login state
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
