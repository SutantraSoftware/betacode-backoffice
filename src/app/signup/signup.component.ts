import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  userData = { username: '', email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService.signup(this.userData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage =
            'User already exists, please try a different email.';
        } else {
          this.errorMessage = 'Error during registration. Please try again.';
        }
      }
    );
  }

  onSubmit(): void {
    console.log('Username:', this.userData.username);
    console.log('Email:', this.userData.email);
    console.log('Password:', this.userData.password);

    this.signup();
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
