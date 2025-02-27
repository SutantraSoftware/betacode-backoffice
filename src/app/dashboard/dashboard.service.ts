import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrlLocal = environment.apiUrlLocal;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get countries details
  getCountriesDetails(): Observable<any> {
    return this.http.get(`${this.apiUrlLocal}/getAllCountries`);
  }

  addCountryDetails( country:any): Observable<any> {
    return this.http.post(`${this.apiUrlLocal}/insertCountry`, country);
  }

  // Update country details
  updateCountryDetails(updatedValueId: any, updatedCountry:any): Observable<any> {
    return this.http.put(`${this.apiUrlLocal}/updateCountry/${updatedValueId}`, updatedCountry);
  }
}
