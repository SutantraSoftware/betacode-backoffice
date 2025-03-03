
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

  getAllBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlLocal}/getallblogs`);
  }

  addBlog(blogData: any): Observable<any> {
    return this.http.post(`${this.apiUrlLocal}/addblog`, blogData);
  }

  updateBlog(blogData: any): Observable<any> {
    return this.http.put(`${this.apiUrlLocal}/updateblog/${blogData._id}`, blogData);
  }

  fetchAndSetblogs() {
    this.getAllBlogs().subscribe((blogsList: any[]) => {
      this.blogSubject.next(blogsList);
    });
  }

  deleteblogDetails(deletedValueId: any): Observable<any> {
    return this.http.delete(`${this.apiUrlLocal}/deleteblog/${deletedValueId}`);
  }
}


