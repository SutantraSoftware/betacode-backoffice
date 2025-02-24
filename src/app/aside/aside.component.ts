import { Component } from '@angular/core';
import { LoginService } from '../login.service';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
  }
}
