import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogsList: any = [];
  title: any = '';
  date: any = '';
  description: string = '';
  image: any = '';
  likes: string = '';
  file!: File | null;
  cdRef: any;
  private unsubscribe$ = new Subject<void>();
  isModalOpen = false;
  isEditModalOpen = false;
  isEditing: number | null = null;

  constructor(private service: BlogService) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Edit card and open the edit modal
  openEditModal(item: any, index: number) {
    this.isEditModalOpen = true; // Open the edit modal
    this.isEditing = index; // Mark the current card as editing
    // this.newCountry = { ...item }; // Pass the current country details to the modal
    // console.log(this.newCountry); // Check if data is correctly passed
  }

  // Close the edit modal
  closeEditPopup(event: any) {
    this.isEditModalOpen = event;
    this.isEditing = null; // Reset editing status
  }

  saveCard(index: number) {
    this.isEditing = null;
  }

  cancelEdit() {
    this.isEditing = null;
  }

  // deleteCard(itemId: any) {
  //   this.dashboardService.deleteCountryDetails(itemId).subscribe(() => {
  //     this.dashboardService.fetchAndSetCountries();
  //   });
  // }

  resetForm() {
    this.title = '';
    this.date = '';
    this.description = '';
    this.image = '';
    this.likes = '';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async submitBlog() {
    if (this.file) {
      const base64Image = await this.convertFileToBase64(this.file);
      this.image = base64Image;
      const blogData = {
        title: this.title,
        date: this.date,
        description: this.description,
        image: this.image,
        likes: this.likes,
      };
      this.service.addBlog(blogData).subscribe((res) => {
        console.log(res);
        this.resetForm();
      });
    }
  }
  ngOnInit() {
    this.service.getAllBlogs();
    this.service.blogs$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((blogs) => {
        console.log('Blogs received:', blogs);
        this.blogsList = blogs;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
