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

  // Add country details with image
  addCountryDetails(newCountry: {
    country_name: string;
    country_code: string;
    image: File;
  }): Observable<any> {
    const formData = new FormData();
    formData.append('country_name', newCountry.country_name);
    formData.append('country_code', newCountry.country_code);
    formData.append('image', newCountry.image);
    return this.http.post(`${this.apiUrlLocal}/insertCountry`, formData);
  }

  // Update country details
  updateCountryDetails(updatedValueId: any): Observable<any> {
    return this.http.put(`${this.apiUrlLocal}/updateCountry`, updatedValueId);
  }
}
