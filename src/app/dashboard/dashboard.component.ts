import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  countriesList: any = [];
  newCountry = { country_name: '', country_code: '' };
  imagePath: string = '';
  subscription=new Subscription();
  destroy$=new Subject<any>();

  constructor(private dashboardService: DashboardService, private cdRef:ChangeDetectorRef) {}

  ngOnInit():void {
    this.getAllCountries();
    this.dashboardService.fetchAndSetCountries();
  } 
  
 getAllCountries() {
  this.dashboardService.countries$.pipe(takeUntil(this.destroy$)).subscribe((countriesList) => {
    console.log(this.countriesList);
    this.countriesList = countriesList;
    this.cdRef.markForCheck();
  })
   
 }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
