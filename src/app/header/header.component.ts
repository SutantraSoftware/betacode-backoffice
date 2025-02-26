import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private isLoggedIn = false;
  private router = inject(Router);

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn'); // Clear login state
    this.router.navigate(['/login']);
  }
}
