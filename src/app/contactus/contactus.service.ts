import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  private apiUrlLocal = environment.apiUrlLocal

  constructor(private http: HttpClient) { }

  getAllContactforms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlLocal}/allContactforms`);
  }
  



}

