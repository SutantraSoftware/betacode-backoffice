import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogsList: any = [];
  title: string = '';
  date: string = '';
  description: string = '';
  image: string = '';
  file!: File | null;
  isModalOpen = false;
  isEditing: number | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private service: BlogService) {}

  ngOnInit() {
    this.service.fetchAndSetblogs();
    this.service.blogs$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((blogs) => {
        this.blogsList = blogs;
      });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Open the edit modal and initialize fields for editing
  openEditModal(item: any, index: number) {
    this.isEditing = index; // Set the row index as the editing row
    // Initialize fields with existing values
    this.title = item.title;
    this.date = item.date;
    this.description = item.description;
    this.image = item.image;
  }

  // Save edited data and send it to backend
  saveCard(index: number) {
    const updatedBlog = {
      _id: this.blogsList[index]._id, // Using the ID from the original blog
      title: this.title,
      date: this.date,
      description: this.description,
      image: this.image,
    };

    this.service.updateBlog(updatedBlog).subscribe((res) => {
      this.blogsList[index] = res; // Update the blog list with the updated data
      this.isEditing = null; // Reset the editing flag
      this.service.fetchAndSetblogs();
    });
  }

  // Cancel edit mode and close the modal
  cancelEdit() {
    this.isEditing = null;
  }

  // Delete a blog entry
  deleteCard(blogId: any) {
    this.service.deleteblogDetails(blogId).subscribe(() => {
      this.service.fetchAndSetblogs(); // Refresh the blog list after deletion
    });
  }

  // File change handler for image upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  // Convert file to base64 format
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Submit new blog
  async submitBlog() {
    if (this.file) {
      const base64Image = await this.convertFileToBase64(this.file);
      this.image = base64Image;
    }
    const blogData = {
      title: this.title,
      date: this.date,
      description: this.description,
      image: this.image,
    };

    this.service.addBlog(blogData).subscribe((res) => {
      this.resetForm();
    });
  }

  // Reset the form fields
  resetForm() {
    this.title = '';
    this.date = '';
    this.description = '';
    this.image = '';
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}





