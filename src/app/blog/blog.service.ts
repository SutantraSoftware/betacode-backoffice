import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrlLocal = environment.apiUrlLocal;
  constructor(private http: HttpClient) {}

  addBlog(blogData: any): Observable<any> {
    return this.http.post(`${this.apiUrlLocal}/addblog`, blogData);
  }
}
