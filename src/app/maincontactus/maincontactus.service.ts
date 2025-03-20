import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaincontactusService {

private apiUrl = environment.apiUrl
private apiUrlLocal = environment.apiUrlLocal


constructor(private http:HttpClient) { }

getAllMainContactusforms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlLocal}/allcontactusforms`);
}
}
 