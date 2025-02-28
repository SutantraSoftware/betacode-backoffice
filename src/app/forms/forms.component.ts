import { ChangeDetectorRef, Component } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  countries: any = [];
  countryCode: string = '';
  constructor(
    private service: DashboardService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.getCountries();
    this.route.params.subscribe((res) => {
      this.countryCode = res['code'];
    });
  }

  getCountries() {
    this.service.getCountriesDetails().subscribe((countries) => {
      this.countries = countries;
      this.cd.markForCheck();
    });
  }

  getCountryDetails() {}
}
