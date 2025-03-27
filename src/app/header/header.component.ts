import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy{
  userName:string | null='';
  destroy$ =new Subject<any>();
  userData = { username: '', email: '', password: '' };
  private isLoggedIn = false;
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName'); 
    this.router.navigate(['/login']);
    // setTimeout(()=>{
    //   this.router.navigate(['/login']);
    // },500);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
