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
  successMessage = "" ;
  errorMessage = '';
  loading = false;
  userName:string='';
  constructor(
    private authService: AuthService,
    private router: Router,
    private service: LoginService,
  ) {}

  login(): void {
    this.loading = true;
    this.service.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('userName', response?.username);
        this.userName=response?.username ?? '';
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

   onForgotPassword(): void {
    const email = prompt("Enter your email address to reset your password:");
    if (email) {
      this.loading = true;
      this.service.forgotPassword({ email }).subscribe(
        (response) => {
          this.successMessage = response.message || 'Reset link sent to your email.';
          this.errorMessage = '';  // Clear previous errors
          this.loading = false;
        },
        (error) => {
          console.error('Forgot password error:', error);
          this.errorMessage = error.message || 'An error occurred while processing your request.';
          this.successMessage = '';  // Clear success message
          this.loading = false;
        }
      );
    }
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




