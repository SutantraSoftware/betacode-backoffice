import { Component, inject } from '@angular/core';
import { AuthService } from './guards/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Betacode-Backoffice';
  authService = inject(AuthService);

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
