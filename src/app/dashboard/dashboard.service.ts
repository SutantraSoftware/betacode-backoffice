import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  private countriesSubject = new BehaviorSubject<any[]>([]);
  countries$ = this.countriesSubject.asObservable(); 
  constructor(private http: HttpClient) {}

  

  // Get countries details
  getCountriesDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllCountries`);
  }

  addCountryDetails(country: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertCountry`, country);
  }

  // Update country details
  updateCountryDetails(
    updatedValueId: any,
    updatedCountry: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updateCountry/${updatedValueId}`,
      updatedCountry
    );
  }

  fetchAndSetCountries() {
    this.getCountriesDetails().subscribe((countriesList: any[]) => {
      this.countriesSubject.next(countriesList); 
    });
  }

  deleteCountryDetails(deletedValueId: any): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/deleteCountry/${deletedValueId}`
    );
  }

 

  addContentToCountry(formValues: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addcountryform`, formValues);
  }

  updateContentToCountry(formValues: any, id: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updatecountryform/${id}`,
      formValues
    );
  }
  getCountryContent(countryCode: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getSingleCountryform?country_code=${countryCode}`
    );
  }
}
