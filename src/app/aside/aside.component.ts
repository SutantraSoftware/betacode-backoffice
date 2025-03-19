import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit, OnDestroy {
  userName:string | null='';
  destroy$ = new Subject<any>();

  constructor(private loginService: LoginService) {}

  ngOnInit():void{
    this.userName=this.loginService.getUserName();
  }

  logout(): void {
    this.loginService.logout();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
