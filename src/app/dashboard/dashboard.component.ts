import { Component } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  countriesList: any = [];
  newCountry = { country_name: '', country_code: '' };
  imageUrl: string = '';

  constructor(private service: DashboardService) {
    this.getAllCountries();
  }

  getAllCountries() {
    this.service.getCountriesDetails().subscribe((countriesList) => {
      this.countriesList = countriesList;
    });
  }
}
