import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrlLocal = environment.apiUrlLocal;
  private blogSubject = new BehaviorSubject<any[]>([]);
  blogs$ = this.blogSubject.asObservable();
  constructor(private http: HttpClient) {}

  getAllBlogs(): void {
    this.http.get<any[]>(`${this.apiUrlLocal}/getallblogs`).subscribe(
      (response) => {
        this.blogSubject.next(response);
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }
  addBlog(blogData: any): Observable<any> {
    return this.http.post(`${this.apiUrlLocal}/addblog`, blogData);
  }
}
