import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';
  loading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private service: LoginService
  ) {}

  login(): void {
    this.loading = true;
    this.service.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/home']);
        this.loading = false;
        this.authService.login();
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
    this.login();
  }
}
