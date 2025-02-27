import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrlLocal = environment.apiUrlLocal;
  private apiUrl = environment.apiUrl;
  private countriesSubject = new BehaviorSubject<any[]>([]);
  countries$ = this.countriesSubject.asObservable(); // Observable for subscribing components
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

  fetchAndSetCountries() {
    this.getCountriesDetails().subscribe((countriesList: any[]) => {
      this.countriesSubject.next(countriesList); // Emit the new list
    });
  }

  deleteCountryDetails(deletedValueId:any): Observable<any>{
    return this.http.delete(`${this.apiUrlLocal}/deleteCountry/${deletedValueId}`)
  }
}
