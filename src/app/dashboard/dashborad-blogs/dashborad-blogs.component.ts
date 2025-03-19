import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from 'src/app/blog/blog.service';

@Component({
  selector: 'dashborad-blogs',
  templateUrl: './dashborad-blogs.component.html',
  styleUrls: ['./dashborad-blogs.component.scss']
})
export class DashboradBlogsComponent {
  blogsList: any = [];
  private unsubscribe$ = new Subject<any>();

  constructor(private service: BlogService) {}
  ngOnInit() {
    this.service.fetchAndSetblogs();
    this.service.blogs$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((blogs:any) => {
        this.blogsList = blogs;
        this.blogsList=this.blogsList.slice(0, 4);
      });
  } 
  ngOnDestroy(){
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}








