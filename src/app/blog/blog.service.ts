
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = environment.apiUrl;
  private blogSubject = new BehaviorSubject<any[]>([]);
  blogs$ = this.blogSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getallblogs`);
  }

  addBlog(blogData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addblog`, blogData);
  }

  updateBlog(blogData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateblog/${blogData._id}`, blogData);
  }

  fetchAndSetblogs() {
    this.getAllBlogs().subscribe((blogsList: any[]) => {
      this.blogSubject.next(blogsList);
    });
  }
 
  deleteblogDetails(deletedValueId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteblog/${deletedValueId}`);
  }
}


