import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';
  loading = false;
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.loading = true;
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/aside']);
        this.loading = false;
      },
      (error) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials';
          this.loading = false;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    );
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  onSubmit(): void {
    console.log('Email:', this.credentials.email);
    console.log('Password:', this.credentials.password);
  }
}
